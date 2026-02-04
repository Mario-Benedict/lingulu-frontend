import { useState } from 'react';
import Sidebar from '@components/common/Sidebar';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import PronunciationQuestion from '@components/lessons/exercises/PronunciationQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';

const PronunciationExercise: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const totalQuestions = 10;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const questions = [
    {
      id: 1,
      question: 'Say "Selamat pagi" (Good morning)',
      type: 'pronunciation',
    },
    {
      id: 2,
      question: 'Say "Terima kasih" (Thank you)',
      type: 'pronunciation',
    },
    {
      id: 3,
      question: 'Say "Apa kabar?" (How are you?)',
      type: 'pronunciation',
    },
    {
      id: 4,
      question: 'Say "Nama saya..." (My name is...)',
      type: 'pronunciation',
    },
    {
      id: 5,
      question: 'Say "Selamat malam" (Good evening)',
      type: 'pronunciation',
    },
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setIsListening(false);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setIsListening(false);
    }
  };

  const handleMicrophoneClick = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="flex h-screen bg-lessongray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      <div className="flex-1 flex flex-col min-w-0">
        <ExerciseHeader
          title="Latihan Pronunciation"
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full px-8">
              <ProgressBar progress={progressPercentage} className="mb-8" />
              {currentQuestionData && (
                <PronunciationQuestion
                  questionNumber={currentQuestion}
                  questionText={currentQuestionData.question}
                  isListening={isListening}
                  onMicrophoneClick={handleMicrophoneClick}
                />
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
  );
};

export default PronunciationExercise;
