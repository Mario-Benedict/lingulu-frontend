import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '@components/common/PageLayout';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import PronunciationQuestion from '@components/lessons/exercises/PronunciationQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';
import SummaryResultPronunciation from '@components/lessons/exercises/SummaryResultPronunciation';
import SpeakingReview from '@components/lessons/exercises/SpeakingReview';
import { getSpeakingExercises } from '@/api/services';
import type { SpeakingExercise } from '@/types';

const PronunciationExercise: React.FC = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  
  const [exercises, setExercises] = useState<SpeakingExercise[]>([]);
  const [sectionTitle, setSectionTitle] = useState('Speaking Exercise');
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [scores, setScores] = useState<Record<number, number>>({});
  const totalQuestions = exercises.length;
  const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  useEffect(() => {
    const fetchExercises = async () => {
      if (!sectionId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getSpeakingExercises(sectionId);
        
        if (response.data) {
          setSectionTitle(response.data.sectionTitle || 'Speaking Exercise');
          setExercises(response.data.speakings || []);
        }
      } catch {
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [sectionId]);

  const generateWordCorrections = (text: string, score: number): ('correct' | 'okay' | 'incorrect')[] => {
    const words = text.split(' ');
    return words.map(() => {
      if (score >= 85) return 'correct';
      if (score >= 70) return 'okay';
      return 'incorrect';
    });
  };

  const getFeedbackForScore = (score: number): string => {
    if (score >= 90) return 'Sempurna! Pelafalan Anda sangat bagus!';
    if (score >= 80) return 'Bagus! Terus tingkatkan pelafalan Anda!';
    if (score >= 70) return 'Cukup baik! Terus berlatih!';
    return 'Perlu lebih banyak latihan. Jangan menyerah!';
  };

  const currentQuestionData = exercises[currentQuestion - 1];

  const currentReviewData = scores[currentQuestion] ? {
    score: scores[currentQuestion],
    corrections: generateWordCorrections(currentQuestionData?.sentence || '', scores[currentQuestion]),
    feedback: getFeedbackForScore(scores[currentQuestion]),
  } : undefined;

  const handleNext = () => {
    // Show review popup when Next is clicked
    if (scores[currentQuestion] !== undefined) {
      setShowReview(true);
    } else {
      // If no score yet, just proceed
      if (currentQuestion < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1);
        setIsListening(false);
      } else {
        setShowSummary(true);
      }
    }
  };

  const handleRetryAnswer = () => {
    // Reset the score for current question to allow re-recording
    setScores((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });
    setIsListening(false);
  };

  const handleMicrophoneClick = () => {
    // Simulate score for demonstration
    if (!isListening) {
      setIsListening(true);
    } else {
      setIsListening(false);
      // Generate random score between 80-95 for demo
      const randomScore = Math.floor(Math.random() * 16) + 80;
      setScores((prev) => ({
        ...prev,
        [currentQuestion]: randomScore,
      }));
    }
  };

  const getSummaryData = () => {
    return exercises.map((exercise, index) => ({
      questionNumber: index + 1,
      questionText: exercise.sentence,
      score: scores[index + 1] || 0,
    }));
  };

  const handleRetry = () => {
    setCurrentQuestion(1);
    setScores({});
    setShowSummary(false);
    setShowReview(false);
    setIsListening(false);
  };

  const handleFinish = () => {
    navigate(-1);
  };

  const handleReviewNext = () => {
    setShowReview(false);
    setIsListening(false);
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
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

  if (loading) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!exercises || exercises.length === 0) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lessongray-600">No exercises available</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      {showReview && currentReviewData && currentQuestionData && (
        <SpeakingReview
          score={currentReviewData.score}
          text={currentQuestionData.sentence}
          corrections={currentReviewData.corrections}
          feedback={currentReviewData.feedback}
          onNext={handleReviewNext}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <ExerciseHeader
          title={sectionTitle}
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
                    questionText={currentQuestionData.sentence}
                    audioPath={currentQuestionData.audioPath}
                    isListening={isListening}
                    onMicrophoneClick={handleMicrophoneClick}
                    isAnswered={scores[currentQuestion] !== undefined}
                  />
                )}
              </div>
              <NavigationButtons
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                onBack={handleRetryAnswer}
                onNext={handleNext}
                isNextDisabled={scores[currentQuestion] === undefined}
                isRetryDisabled={isListening}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PronunciationExercise;
