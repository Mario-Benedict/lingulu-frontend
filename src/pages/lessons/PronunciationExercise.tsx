import { useState, useEffect, useRef, useCallback } from 'react';
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

// Audio processing utilities
const float32ToWavBlob = (samples: Float32Array, sampleRate: number): Blob => {
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataBytes = samples.length * blockAlign;
  const buffer = new ArrayBuffer(44 + dataBytes);
  const v = new DataView(buffer);

  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(off + i, s.charCodeAt(i));
  };

  writeStr(0, 'RIFF');
  v.setUint32(4, 36 + dataBytes, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, numChannels, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * blockAlign, true);
  v.setUint16(32, blockAlign, true);
  v.setUint16(34, 16, true);
  writeStr(36, 'data');
  v.setUint32(40, dataBytes, true);

  let off = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    off += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
};

const downsampleTo16k = (samples: Float32Array, fromRate: number): Float32Array => {
  if (fromRate === 16000) return samples;

  const ratio = fromRate / 16000;
  const newLength = Math.round(samples.length / ratio);
  const result = new Float32Array(newLength);

  for (let i = 0; i < newLength; i++) {
    const srcIndex = i * ratio;
    const lo = Math.floor(srcIndex);
    const hi = Math.min(lo + 1, samples.length - 1);
    const frac = srcIndex - lo;
    result[i] = samples[lo] * (1 - frac) + samples[hi] * frac;
  }

  return result;
};

const PronunciationExercise: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  // Audio recording refs
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const pcmChunksRef = useRef<Float32Array[]>([]);
  
  // State
  const [exercises, setExercises] = useState<SpeakingExercise[]>([]);
  const [sectionTitle, setSectionTitle] = useState('Speaking Exercise');
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showReview, setShowReview] = useState(false);
  
  // Store results for each question
  const [questionResults, setQuestionResults] = useState<Record<number, {
    score: number;
    corrections: ('correct' | 'okay' | 'incorrect')[];
    words: WordRequest[];
  }>>({});
  
  const totalQuestions = exercises.length;
  const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  useEffect(() => {
    const {t} = useTranslation();
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
              }> = {};
              
              allExercises.forEach((exercise, index) => {
                const matchingAttempt = attempts.find(
                  (attempt) => attempt.sentence === exercise.sentence
                );
                
                if (matchingAttempt) {
                  results[index + 1] = {
                    score: Math.round(matchingAttempt.averageScore),
                    corrections: generateWordCorrections(matchingAttempt.words),
                    words: matchingAttempt.words,
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
  }, [sectionId]);

  const generateWordCorrections = (
    words: WordRequest[]
  ): ('correct' | 'okay' | 'incorrect')[] => {
    return words.map((word) => {
      if (word.score >= 70) return 'correct';
      if (word.score >= 50) return 'okay';
      return 'incorrect';
    });
  };

  const getFeedbackForScore = (score: number): string => {
    if (score >= 80) return t('lessons.feedback.perfect');
    if (score >= 70) return t('lessons.feedback.good');
    if (score >= 60) return t('lessons.feedback.okay');
    return t('lessons.feedback.improve');
  };

  const currentQuestionData = exercises[currentQuestion - 1];
  const currentResult = questionResults[currentQuestion];

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
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
          },
        });

        streamRef.current = stream;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        const processor = ctx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        pcmChunksRef.current = [];

        processor.onaudioprocess = (e) => {
          const input = e.inputBuffer.getChannelData(0);
          pcmChunksRef.current.push(new Float32Array(input));
        };

        source.connect(processor);
        processor.connect(ctx.destination);
        setIsRecording(true);
      } catch {
        alert(t('conversation.cantAccessMic'));
      }
    } else {
      // Stop recording and process
      processorRef.current?.disconnect();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
      setIsProcessing(true);

      const chunks = pcmChunksRef.current;
      const actualRate = audioCtxRef.current?.sampleRate ?? 48000;
      const totalFrames = chunks.reduce((n, c) => n + c.length, 0);

      if (totalFrames < actualRate * 0.3) {
        setIsProcessing(false);
        alert('Recording too short. Please try again.');
        return;
      }

      const merged = new Float32Array(totalFrames);
      let off = 0;
      for (const c of chunks) {
        merged.set(c, off);
        off += c.length;
      }

      const resampled = downsampleTo16k(merged, actualRate);
      const wavBlob = float32ToWavBlob(resampled, 16000);

      try {
        const scoreData = await getSpeakingExerciseScore(
          wavBlob,
          currentQuestionData.sentence
        );
        
        const words: WordRequest[] = scoreData.pronounciation_assessment.words.map(
          (w) => ({
            word: w.word,
            score: w.score,
          })
        );
        
        const averageScore = Math.round(
          scoreData.pronounciation_assessment.average_score
        );
        const corrections = generateWordCorrections(words);

        // Store result for this question
        setQuestionResults((prev) => ({
          ...prev,
          [currentQuestion]: {
            score: averageScore,
            corrections,
            words,
          },
        }));

        // Save attempt
        const attemptData: SpeakingAttempt = {
          sectionId,
          speakingId: currentQuestionData.speakingId,
          sentence: currentQuestionData.sentence,
          averageScore,
          words,
        };

        // If last question, use submitSpeakingExercise
        if (currentQuestion === totalQuestions) {
          await submitSpeakingExercise(attemptData);
        } else {
          // Otherwise use attemptSpeakingExercise
          await attemptSpeakingExercise(attemptData);
        }

        // Show review popup
        setShowReview(true);
      } catch (error) {
        console.error('Failed to process audio:', error);
        alert('Failed to process audio. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  }, [isRecording, isProcessing, sectionId, currentQuestion, totalQuestions, currentQuestionData]);

  const handleNext = () => {
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
