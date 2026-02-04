import { useState } from 'react';
import Sidebar from '@components/common/Sidebar';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import QuestionCard from '@components/lessons/exercises/QuestionCard';
import MicrophoneButton from '@components/lessons/exercises/MicrophoneButton';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';

const Exercise: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const totalQuestions = 10;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const questions = [
    {
      id: 1,
      question: 'what does "Good morning" mean in indonesian?',
      type: 'voice',
    },
    {
      id: 2,
      question: 'How do you say "Thank you" in Indonesian?',
      type: 'voice',
    },
    {
      id: 3,
      question: 'Translate "How are you?" to Indonesian',
      type: 'voice',
    },
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleMicrophoneClick = () => {
    setIsListening(!isListening);
    console.log('Microphone clicked');
  };

  return (
    <div className="flex h-screen bg-lessongray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      <div className="flex-1 flex flex-col min-w-0">
        <ExerciseHeader
          title="Lessons 2 : judul soal"
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <ProgressBar progress={progressPercentage} className="mb-8" />
              <QuestionCard
                questionNumber={currentQuestion}
                questionText={currentQuestionData?.question || ''}
              />
              <MicrophoneButton
                isListening={isListening}
                onClick={handleMicrophoneClick}
              />
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
    </div>
  );
}


export default Exercise;