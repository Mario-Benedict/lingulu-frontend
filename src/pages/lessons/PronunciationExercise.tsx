import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageLayout from '@components/common/PageLayout';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import PronunciationQuestion from '@components/lessons/exercises/PronunciationQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';
import SummaryResultPronunciation from '@components/lessons/exercises/SummaryResultPronunciation';

const PronunciationExercise: React.FC = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [scores, setScores] = useState<Record<number, number>>({});
  const totalQuestions = 10;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const questions = [
    {
      id: 1,
      question: 'Say "Selamat pagi" (Good morning)',
      text: 'Selamat pagi',
      type: 'pronunciation',
    },
    {
      id: 2,
      question: 'Say "Terima kasih" (Thank you)',
      text: 'Terima kasih',
      type: 'pronunciation',
    },
    {
      id: 3,
      question: 'Say "Apa kabar?" (How are you?)',
      text: 'Apa kabar?',
      type: 'pronunciation',
    },
    {
      id: 4,
      question: 'Say "Nama saya..." (My name is...)',
      text: 'Nama saya...',
      type: 'pronunciation',
    },
    {
      id: 5,
      question: 'Say "Selamat malam" (Good evening)',
      text: 'Selamat malam',
      type: 'pronunciation',
    },
    {
      id: 6,
      question: 'Say "Aku Sangat Suka Bermain Bola" (I really love to play football)',
      text: 'Aku Sangat Suka Bermain Bola',
      type: 'pronunciation',
    },
    {
      id: 7,
      question: 'Say "Bagaimana kabarmu hari ini?" (How are you today?)',
      text: 'Bagaimana kabarmu hari ini?',
      type: 'pronunciation',
    },
    {
      id: 8,
      question: 'Say "Saya senang belajar bahasa Inggris" (I enjoy learning English)',
      text: 'Saya senang belajar bahasa Inggris',
      type: 'pronunciation',
    },
    {
      id: 9,
      question: 'Say "Tolong bantu saya" (Please help me)',
      text: 'Tolong bantu saya',
      type: 'pronunciation',
    },
    {
      id: 10,
      question: 'Say "Sampai jumpa lagi" (See you again)',
      text: 'Sampai jumpa lagi',
      type: 'pronunciation',
    },
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  // Helper function to generate per-word corrections based on score
  const generateWordCorrections = (text: string, score: number) => {
    const words = text.split(' ');
    return words.map(() => {
      // Score mapping: >= 85 = correct (hijau), 70-84 = okay (kuning), < 70 = incorrect (merah)
      if (score >= 85) return 'correct';
      if (score >= 70) return 'okay';
      return 'incorrect';
    });
  };

  // Dummy data for testing summary
  const dummySummaryData = questions.map((q) => ({
    questionNumber: q.id,
    questionText: q.text,
    score: 98, // All questions get 98 score for demo
    corrections: generateWordCorrections(q.text, 98), // Generate per-word corrections
  }));

  /**
   * DUMMY DATA FOR TESTING
   * 
   * This dummy data is used to preview the summary result page without completing all 10 questions.
   * Each question has a score of 98 (as shown in the design mockup).
   * 
   * Score mapping for word corrections:
   * - >= 85: correct (Hijau) 
   * - 70-84: okay (Kuning)
   * - < 70: incorrect (Merah)
   * 
   * To remove this test feature in production:
   * 1. Delete the dummySummaryData variable
   * 2. Delete the showDummySummary function
   * 3. Remove the "Preview Summary (Dev)" button from the UI
   * 
   * Expected summary structure:
   * - questionNumber: 1-10
   * - questionText: The text to be pronounced (e.g., "Aku Sangat Suka Bermain Bola")
   * - score: Average pronunciation score (0-100)
   * - averageScore: Total average of all scores (auto-calculated in component)
   */

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setIsListening(false);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setIsListening(false);
    }
  };

  const handleMicrophoneClick = () => {
    // Simulate score for demonstration
    if (!isListening) {
      setIsListening(true);
    } else {
      setIsListening(false);
      // Generate random score between 60-100
      const randomScore = Math.floor(Math.random() * 41) + 60;
      setScores((prev) => ({
        ...prev,
        [currentQuestion]: randomScore,
      }));
    }
  };

  const getSummaryData = () => {
    return questions.map((q) => ({
      questionNumber: q.id,
      questionText: q.text,
      score: scores[q.id] || 0,
    }));
  };

  const handleRetry = () => {
    setCurrentQuestion(1);
    setScores({});
    setShowSummary(false);
    setIsListening(false);
  };

  const handleFinish = () => {
    if (lessonId) {
      const params = courseId ? `?courseId=${courseId}` : '';
      navigate(`/lessons/${lessonId}${params}`);
    } else {
      navigate('/lessons');
    }
  };

  if (showSummary) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <SummaryResultPronunciation
          scores={getSummaryData()}
          onRetry={handleRetry}
          onFinish={handleFinish}
        />
      </PageLayout>
    );
  }

  // Test function to show dummy summary (remove in production)
  const showDummySummary = () => {
    setShowSummary(true);
    setScores(
      dummySummaryData.reduce((acc, item) => {
        acc[item.questionNumber] = item.score;
        return acc;
      }, {} as Record<number, number>)
    );
  };

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0">
        <ExerciseHeader
          title="Latihan Pronunciation"
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />

        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 flex items-center md:items-start justify-center p-4 sm:p-6 md:p-8">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-3xl min-h-[50vh] md:min-h-0 flex flex-col">

              <ProgressBar progress={progressPercentage} className="mb-4 sm:mb-6 md:mb-8" />
              <div className="flex-1 flex flex-col justify-center md:justify-start">
                {currentQuestionData && (
                  <PronunciationQuestion
                    questionNumber={currentQuestion}
                    questionText={currentQuestionData.question}
                    isListening={isListening}
                    onMicrophoneClick={handleMicrophoneClick}
                  />
                )}
              </div>
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
};

export default PronunciationExercise;
