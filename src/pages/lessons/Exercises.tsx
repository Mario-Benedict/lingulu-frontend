import { useState } from 'react';
import PageLayout from '@components/common/PageLayout';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import MultipleChoiceQuestion from '@components/lessons/exercises/MultipleChoiceQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';

const Exercise: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const totalQuestions = 10;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const questions = [
    {
      id: 1,
      question: 'what does "Good morning" mean in indonesian?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Selamat pagi', isCorrect: true },
        { id: 'b', text: 'Selamat malam', isCorrect: false },
        { id: 'c', text: 'Selamat siang', isCorrect: false },
        { id: 'd', text: 'Selamat sore', isCorrect: false },
      ],
    },
    {
      id: 2,
      question: 'How do you say "Thank you" in Indonesian?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Terima kasih', isCorrect: true },
        { id: 'b', text: 'Sama-sama', isCorrect: false },
        { id: 'c', text: 'Permisi', isCorrect: false },
        { id: 'd', text: 'Maaf', isCorrect: false },
      ],
    },
    {
      id: 3,
      question: 'Translate "How are you?" to Indonesian',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Apa kabar?', isCorrect: true },
        { id: 'b', text: 'Siapa nama kamu?', isCorrect: false },
        { id: 'c', text: 'Di mana kamu tinggal?', isCorrect: false },
        { id: 'd', text: 'Berapa umur kamu?', isCorrect: false },
      ],
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

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }));
  };

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