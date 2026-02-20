import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageLayout from '@components/common/PageLayout';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import PronunciationQuestion from '@components/lessons/exercises/PronunciationQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';
import SummaryResultPronunciation from '@components/lessons/exercises/SummaryResultPronunciation';
import SpeakingReview from '@components/lessons/exercises/SpeakingReview';
import { getSpeakingExercises, getSpeakingExercisesRetry, getSpeakingExerciseScore, attemptSpeakingExercise, submitSpeakingExercise } from '@/api/services';
import type { SpeakingExercise, SpeakingAttempt, WordRequest } from '@/types';
import { useTranslation } from 'react-i18next';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { convertToWav16k, validateAudioDuration } from '@/utils/audioUtils';

const PronunciationExercise: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  // Use modern audio recorder hook
  const { isRecording, startRecording, stopRecording, error: audioError } = useAudioRecorder();
  
  // State
  const [exercises, setExercises] = useState<SpeakingExercise[]>([]);
  const [sectionTitle, setSectionTitle] = useState('Speaking Exercise');
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showReview, setShowReview] = useState(false);
  
  // Store results for each question
  const [questionResults, setQuestionResults] = useState<Record<number, {
    score: number;
    corrections: ('correct' | 'okay' | 'incorrect')[];
    words: WordRequest[];
    saved: boolean; // Track if this result has been saved to backend
  }>>({});
  
  const totalQuestions = exercises.length;
  const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  const generateWordCorrections = useCallback((
    words: WordRequest[]
  ): ('correct' | 'okay' | 'incorrect')[] => {
    return words.map((word) => {
      if (word.score >= 70) return 'correct';
      if (word.score >= 50) return 'okay';
      return 'incorrect';
    });
  }, []);

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
          // Check if response has attempts array (already attempted)
          if (Array.isArray(response.data) && response.data.length > 0) {
            // Section already attempted, need to fetch retry to get all questions
            const attempts = response.data as unknown as SpeakingAttempt[];
            
            // Fetch retry to get fresh questions
            const retryResponse = await getSpeakingExercisesRetry(sectionId);
            
            if (retryResponse.data) {
              setSectionTitle(retryResponse.data.sectionTitle || t('lessons.speakingExercise'));
              const allExercises = retryResponse.data.speakings || [];
              setExercises(allExercises);
              
              // Map existing attempts to questionResults by matching sentence
              const results: Record<number, {
                score: number;
                corrections: ('correct' | 'okay' | 'incorrect')[];
                words: WordRequest[];
                saved: boolean;
              }> = {};
              
              allExercises.forEach((exercise, index) => {
                const matchingAttempt = attempts.find(
                  (attempt) => attempt.sentence === exercise.sentence
                );
                
                if (matchingAttempt) {
                  results[index + 1] = {
                    score: matchingAttempt.averageScore,
                    corrections: generateWordCorrections(matchingAttempt.words),
                    words: matchingAttempt.words,
                    saved: true, // Already saved to backend
                  };
                }
              });
              
              setQuestionResults(results);
            }
          } else {
            // Normal response with SectionContent structure
            setSectionTitle(response.data.sectionTitle || t('lessons.speakingExercise'));
            setExercises(response.data.speakings || []);
          }
        }
      } catch {
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [sectionId, t, generateWordCorrections]);

  const getFeedbackForScore = (score: number): string => {
    if (score >= 80) return t('lessons.feedback.perfect');
    if (score >= 70) return t('lessons.feedback.good');
    if (score >= 60) return t('lessons.feedback.okay');
    return t('lessons.feedback.improve');
  };

  const currentQuestionData = exercises[currentQuestion - 1];
  const currentResult = questionResults[currentQuestion];

  // Show audio error if any
  useEffect(() => {
    if (audioError) {
      alert(t('conversation.cantAccessMic'));
    }
  }, [audioError, t]);

  // Auto-show review when navigating to a question with existing results
  useEffect(() => {
    if (currentResult && !showReview && !isRecording && !isProcessing) {
      setShowReview(true);
    }
  }, [currentQuestion, currentResult, showReview, isRecording, isProcessing]);

  const handleMicrophoneClick = useCallback(async () => {
    if (isProcessing || !sectionId) return;

    if (!isRecording) {
      // Start recording
      await startRecording();
    } else {
      // Stop recording and process
      setIsProcessing(true);
      const audioBlob = await stopRecording();

      if (!audioBlob) {
        setIsProcessing(false);
        alert('Failed to record audio. Please try again.');
        return;
      }

      // Validate audio duration
      const isValid = await validateAudioDuration(audioBlob);
      if (!isValid) {
        setIsProcessing(false);
        alert('Recording too short. Please try again.');
        return;
      }

      try {
        // Convert to WAV 16kHz format
        const wavBlob = await convertToWav16k(audioBlob);

        // Get score from model API (external endpoint)
        const scoreData = await getSpeakingExerciseScore(
          wavBlob,
          currentQuestionData.sentence
        );
        
        // Validate response structure
        if (!scoreData || !scoreData.pronounciation_assessment) {
          throw new Error('Invalid response from pronunciation assessment API');
        }

        const { pronounciation_assessment } = scoreData;
        
        if (!pronounciation_assessment.words || !Array.isArray(pronounciation_assessment.words)) {
          throw new Error('No words data in pronunciation assessment response');
        }

        const words: WordRequest[] = pronounciation_assessment.words.map(
          (w) => ({
            word: w.word,
            score: w.score,
          })
        );
        
        const averageScore = pronounciation_assessment.average_score || 0;
        const corrections = generateWordCorrections(words);

        // Store result for this question (NOT saved yet)
        setQuestionResults((prev) => ({
          ...prev,
          [currentQuestion]: {
            score: averageScore,
            corrections,
            words,
            saved: false, // Will be saved when user clicks Next
          },
        }));

        // Show review popup immediately
        setShowReview(true);
      } catch (error) {
        console.error('Failed to process audio:', error);
        
        // Show more specific error message
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to process audio. Please try again.';
        
        alert(errorMessage);
      } finally {
        setIsProcessing(false);
      }
    }
  }, [isRecording, isProcessing, sectionId, currentQuestion, currentQuestionData, generateWordCorrections, startRecording, stopRecording]);

  const handleNext = async () => {
    // Save the current result if not already saved
    if (currentResult && !currentResult.saved && sectionId) {
      try {
        const attemptData: SpeakingAttempt = {
          sectionId,
          speakingId: currentQuestionData.speakingId,
          sentence: currentQuestionData.sentence,
          averageScore: currentResult.score,
          words: currentResult.words,
        };

        // If last question, use submitSpeakingExercise
        if (currentQuestion === totalQuestions) {
          await submitSpeakingExercise(attemptData);
        } else {
          // Otherwise use attemptSpeakingExercise
          await attemptSpeakingExercise(attemptData);
        }

        // Mark as saved
        setQuestionResults((prev) => ({
          ...prev,
          [currentQuestion]: {
            ...currentResult,
            saved: true,
          },
        }));
      } catch (error) {
        console.error('Failed to save attempt:', error);
        alert('Failed to save your attempt. Please try again.');
        return;
      }
    }

    setShowReview(false);
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    // Navigate to previous question
    if (currentQuestion > 1) {
      setShowReview(false);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetryQuestion = () => {
    // Reset the result for current question to allow re-recording
    setQuestionResults((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });
    setShowReview(false);
  };

  const getSummaryData = () => {
    return exercises.map((exercise, index) => {
      const result = questionResults[index + 1];
      return {
        questionNumber: index + 1,
        questionText: exercise.sentence,
        score: result?.score || 0,
        corrections: result?.corrections,
      };
    });
  };

  const handleRetry = async () => {
    if (!sectionId) return;

    try {
      setLoading(true);
      setShowSummary(false);
      setShowReview(false);
      
      const response = await getSpeakingExercisesRetry(sectionId);
      
      if (response.data) {
        setSectionTitle(response.data.sectionTitle || t('lessons.speakingExercise'));
        setExercises(response.data.speakings || []);
        setQuestionResults({});
        setCurrentQuestion(1);
      }
    } catch {
      alert(t('lessons.failedToRetryExercise'));
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

  const handleReviewNext = () => {
    handleNext();
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
          <p className="text-lessongray-600">{t('lessons.noQuestionAvailable')}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      {showReview && currentResult && currentQuestionData && (
        <SpeakingReview
          score={currentResult.score}
          text={currentQuestionData.sentence}
          corrections={currentResult.corrections}
          feedback={getFeedbackForScore(currentResult.score)}
          onNext={handleReviewNext}
          onRetry={handleRetryQuestion}
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
                    questionText={currentQuestionData.sentence}
                    audioPath={currentQuestionData.audioPath}
                    isListening={isRecording}
                    isProcessing={isProcessing}
                    onMicrophoneClick={handleMicrophoneClick}
                    isAnswered={currentResult !== undefined}
                  />
                )}
              </div>
              <NavigationButtons
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                onBack={handleBack}
                onNext={handleNext}
                isNextDisabled={currentResult === undefined}
                isRetryDisabled={isRecording || isProcessing}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PronunciationExercise;
