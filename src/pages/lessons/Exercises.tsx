import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageLayout from '@components/common/PageLayout';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import MultipleChoiceQuestion from '@components/lessons/exercises/MultipleChoiceQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';
import SummaryResult from '@components/lessons/exercises/SummaryResult';
import { getSectionMCQ, submitSectionMCQ, getSectionMCQRetry } from '@api/services/mcq'; 

const Exercise: React.FC = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendSummary, setBackendSummary] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const totalQuestions = questions.length;
  const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  // 👇 Dibuat jadi satu fungsi terpisah supaya mudah dipanggil ulang saat Retry
  const loadQuestions = async (isRetry = false) => {
    if (!sectionId) return;

    try {
      setLoading(true);
      
      // Pilih API berdasarkan apakah user sedang mere-try kuis atau tidak
      const res = isRetry 
        ? await getSectionMCQRetry(sectionId) 
        : await getSectionMCQ(sectionId);
        
      const data = res.data?.data || res.data;

      // Kalau BUKAN mode retry, dan ternyata dia punya nilai di backend, tampilkan summary
      if (!isRetry && data?.score !== undefined && data?.answers) {

        console.log("🚨 1. FULL DATA SUMMARY DARI BACKEND:", data);
        console.log("🚨 2. ISI ARRAY ANSWERS:", data.answers);

        setBackendSummary(data);
        return; // Hentikan fungsi di sini, jangan lanjut ekstrak soal
      }

      // Mulai ekstrak soal dari backend (Berlaku untuk user baru atau user yang me-retry)
      let questionsRaw = [];
      if (data?.mcq?.questions) {
        questionsRaw = data.mcq.questions;
      } else if (data?.questions) {
        questionsRaw = data.questions;
      }

      const mcqQuestions = questionsRaw.map((q: any) => ({
        id: q.questionId || q.id,
        question: q.question || q.text || '',
        options: (q.options || []).map((opt: any) => ({
          id: opt.optionId || opt.id,
          text: opt.optionText || opt.text || '',
          isCorrect: opt.isCorrect ?? false,
        })),
      }));

      setQuestions(mcqQuestions);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  // 👇 useEffect sekarang hanya memanggil fungsi loadQuestions dengan mode normal (false)
  useEffect(() => {
    loadQuestions(false);
  }, [sectionId]);

  const currentQuestionData = questions[currentQuestion - 1];

  const handleNext = () => {
    const currentAnswer = selectedAnswers[currentQuestion];

    if (!currentAnswer) {
      setError('Please select an answer (A, B, or C)');
      return;
    }

    setError(''); 

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitToBackend();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }));
  };

  // 👇 handleRetry sekarang memanggil API baru
  const handleRetry = () => {
    setBackendSummary(null);
    setSelectedAnswers({});
    setCurrentQuestion(1);
    setError('');
    
    // Panggil ulang soalnya dengan mode Retry (true) untuk membypass cek history backend
    loadQuestions(true); 
  };

  const handleFinish = () => {
    if (courseId) {
      navigate(`/lessons/course/${courseId}`); 
    } else {
      navigate(-1);
    }
  };

  const handleSubmitToBackend = async () => {
    if (!sectionId) return;

    try {
      const payload = {
        sectionId: String(sectionId),
        answers: Object.entries(selectedAnswers)
          .filter(([_, selectedOptionId]) => !!selectedOptionId)
          .map(([questionNum, selectedOptionId]) => {
            const questionIndex = parseInt(questionNum) - 1;
            const question = questions[questionIndex];

            return {
              questionId: String(question.id),
              selectedOptionId: String(selectedOptionId),
            };
          }),
      };

      const res = await submitSectionMCQ(payload);
      const summary = res?.data;

      setBackendSummary(summary); 
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

 if (backendSummary) {
    // 👇 1. KITA MAPPING DATANYA DI SINI AGAR SESUAI DENGAN PERMINTAAN SUMMARY RESULT
    const formattedAnswers = backendSummary.answers?.map((ans: any, index: number) => ({
      questionNumber: index + 1,              // Menampilkan nomor soal (1, 2, 3...)
      questionText: ans.questionText,         // Menampilkan teks soal
      selectedOption: ans.selectedOptionText, // 👈 INI KUNCINYA! Mengubah 'selectedOptionText' jadi 'selectedOption'
      isCorrect: ans.isCorrect                // Menampilkan icon benar/salah
    })) || [];

    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <SummaryResult
          score={backendSummary.score}
          // Tambahkan fallback length supaya aman jika backend lupa kirim totalQuestions
          totalQuestions={backendSummary.totalQuestions || backendSummary.answers?.length || 0} 
          answers= {formattedAnswers}
          onRetry={handleRetry}
          onFinish={handleFinish}
        />
      </PageLayout>
    );
  }

  // Tampilkan loading state supaya layar tidak kosong berkedip saat menekan retry
  if (loading && questions.length === 0) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
         <div className="flex h-screen items-center justify-center">Loading...</div>
      </PageLayout>
    )
  }

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0">
        <ExerciseHeader
          title="Lessons 2 : judul soal"
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />

        <div className="flex-1 overflow-y-auto md:overflow-y-visible flex flex-col">
          <div className="flex-1 flex items-center md:items-start justify-center p-4 sm:p-6 md:p-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full max-w-3xl min-h-[50vh] md:min-h-0 md:h-fit flex flex-col">
              <ProgressBar progress={progressPercentage} className="mb-4 sm:mb-6 md:mb-8" />
              <div className="flex-1 flex flex-col justify-center md:justify-start">
                {currentQuestionData && (
                  <MultipleChoiceQuestion
                    questionNumber={currentQuestion}
                    questionText={currentQuestionData.question}
                    options={currentQuestionData.options}
                    selectedOptionId={selectedAnswers[currentQuestion] || null}
                    onSelectOption={handleSelectOption}
                  />
                )}
              </div>
                {error && (
                 <p className="text-red-500 text-sm mt-3 text-center">
                  {error}
                 </p>
                )}
              
              <NavigationButtons
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                onBack={handleBack}
                onNext={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Exercise;