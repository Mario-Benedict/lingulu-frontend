import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageLayout from '@components/common/PageLayout';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import MultipleChoiceQuestion from '@components/lessons/exercises/MultipleChoiceQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';
import SummaryResult from '@components/lessons/exercises/SummaryResult';
import { getMcqExercises, getMcqExercisesRetry, submitMcqAnswer } from '@/api/services';
import type { MCQQuestion, MCQResult } from '@/types';
import { useTranslation } from 'react-i18next';

const Exercise: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [sectionTitle, setSectionTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<MCQResult | null>(null);
  const [error, setError] = useState<string>('');

  const totalQuestions = questions.length;
  const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  const loadQuestions = useCallback(async () => {
    if (!sectionId) return;

    try {
      setLoading(true);
      const response = await getMcqExercises(sectionId);
      const data = response.data!;

      setSectionTitle(data.sectionTitle);
      
      // Check if section is already completed (has answers and score)
      if ('answers' in data && 'score' in data && Array.isArray(data.answers)) {
        // Section already completed, show summary
        setSummary(data as unknown as MCQResult);
      } else if (data.mcq?.questions) {
        // Section not completed, load questions
        setQuestions(data.mcq.questions);
      }
    } catch {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const currentQuestionData = questions[currentQuestion - 1];

  const handleNext = () => {
    const currentAnswer = selectedAnswers[currentQuestion];

    if (!currentAnswer) {
      setError('Please select an answer');
      return;
    }

    setError(''); 

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
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
    setError('');
  };

  const handleRetry = async () => {
    if (!sectionId) return;

    try {
      setLoading(true);
      setSummary(null);
      setSelectedAnswers({});
      setCurrentQuestion(1);
      setError('');

      const response = await getMcqExercisesRetry(sectionId);
      const data = response.data!;

      setSectionTitle(data.sectionTitle);
      
      if (data.mcq?.questions) {
        setQuestions(data.mcq.questions);
      }
    } catch {
      setError('Failed to retry exercise');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    if (courseId) {
      navigate(`/lessons/${courseId}/map`);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    if (!sectionId) return;

    try {
      setLoading(true);
      const answers = Object.entries(selectedAnswers).map(([questionNum, selectedOptionId]) => {
        const questionIndex = parseInt(questionNum) - 1;
        const question = questions[questionIndex];

        return {
          questionId: question.questionId,
          selectedOptionId,
        };
      });

      const response = await submitMcqAnswer({
        sectionId,
        answers,
      });

      setSummary(response.data!);
    } catch {
      setError('Failed to submit answers');
    } finally {
      setLoading(false);
    }
  };

  if (summary) {
    const formattedAnswers = summary.answers.map((ans, index) => ({
      questionNumber: index + 1,
      questionText: ans.questionText,
      selectedOption: ans.selectedOptionText,
      isCorrect: ans.isCorrect,
    }));

    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <SummaryResult
          score={summary.score}
          totalQuestions={summary.totalQuestions}
          answers={formattedAnswers}
          onRetry={handleRetry}
          onFinish={handleFinish}
        />
      </PageLayout>
    );
  }

  if (loading) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <div className="flex h-screen items-center justify-center">
          <div className="text-xl text-gray-600">{t('common.loading')}</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0">
        <ExerciseHeader
          title={sectionTitle}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />

        <div className="flex-1 overflow-y-auto md:overflow-y-visible flex flex-col">
          <div className="flex-1 flex items-center md:items-start justify-center p-4 sm:p-6 md:p-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full max-w-3xl min-h-[50vh] md:min-h-0 md:h-fit flex flex-col">
              <ProgressBar progress={progressPercentage} className="mb-4 sm:mb-6 md:mb-8" />
              <div className="flex-1 flex flex-col justify-center md:justify-start">
                {currentQuestionData ? (
                  <MultipleChoiceQuestion
                    questionNumber={currentQuestion}
                    questionText={currentQuestionData.question}
                    options={currentQuestionData.options.map(opt => ({
                      id: opt.optionId,
                      text: opt.text,
                    }))}
                    selectedOptionId={selectedAnswers[currentQuestion] || null}
                    onSelectOption={handleSelectOption}
                  />
                ) : (
                  <div className="text-center text-gray-500">{t('lessons.noQuestionAvailable')}</div>
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