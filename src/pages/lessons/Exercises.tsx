import { useState } from 'react';
import PageLayout from '@components/common/PageLayout';
import ExerciseHeader from '@components/lessons/exercises/ExerciseHeader';
import ProgressBar from '@components/lessons/exercises/ProgressBar';
import MultipleChoiceQuestion from '@components/lessons/exercises/MultipleChoiceQuestion';
import NavigationButtons from '@components/lessons/exercises/NavigationButtons';
import SummaryResult from '@components/lessons/exercises/SummaryResult';

const Exercise: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showSummary, setShowSummary] = useState(true);
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
    {
      id: 4,
      question: 'What is the English word for "Buku"?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Book', isCorrect: true },
        { id: 'b', text: 'Pen', isCorrect: false },
        { id: 'c', text: 'Paper', isCorrect: false },
        { id: 'd', text: 'Desk', isCorrect: false },
      ],
    },
    {
      id: 5,
      question: 'How do you say "Goodbye" in Indonesian?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Sampai jumpa', isCorrect: true },
        { id: 'b', text: 'Selamat tinggal', isCorrect: false },
        { id: 'c', text: 'Sampai nanti', isCorrect: false },
        { id: 'd', text: 'Dadah', isCorrect: false },
      ],
    },
    {
      id: 6,
      question: 'What does "Rumah" mean in English?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'House', isCorrect: true },
        { id: 'b', text: 'School', isCorrect: false },
        { id: 'c', text: 'Office', isCorrect: false },
        { id: 'd', text: 'Hospital', isCorrect: false },
      ],
    },
    {
      id: 7,
      question: 'Translate "I am learning English" to simple Indonesian',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Saya belajar bahasa Inggris', isCorrect: true },
        { id: 'b', text: 'Dia belajar bahasa Indonesia', isCorrect: false },
        { id: 'c', text: 'Kami berbicara bahasa Inggris', isCorrect: false },
        { id: 'd', text: 'Mereka belajar bahasa', isCorrect: false },
      ],
    },
    {
      id: 8,
      question: 'What is "Makanan" in English?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Food', isCorrect: true },
        { id: 'b', text: 'Drink', isCorrect: false },
        { id: 'c', text: 'Meal', isCorrect: false },
        { id: 'd', text: 'Plate', isCorrect: false },
      ],
    },
    {
      id: 9,
      question: 'How do you say "My name is..." in English?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'My name is...', isCorrect: true },
        { id: 'b', text: 'I am name...', isCorrect: false },
        { id: 'c', text: 'My is name...', isCorrect: false },
        { id: 'd', text: 'The name is...', isCorrect: false },
      ],
    },
    {
      id: 10,
      question: 'What does "Waktu" mean?',
      type: 'multiple-choice',
      options: [
        { id: 'a', text: 'Time', isCorrect: true },
        { id: 'b', text: 'Clock', isCorrect: false },
        { id: 'c', text: 'Hour', isCorrect: false },
        { id: 'd', text: 'Day', isCorrect: false },
      ],
    },
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  // Calculate score
  const calculateScore = () => {
    return Object.entries(selectedAnswers).reduce((acc, [questionNum, selectedId]) => {
      const question = questions[parseInt(questionNum) - 1];
      const isCorrect = question.options.find((opt) => opt.id === selectedId)?.isCorrect;
      return acc + (isCorrect ? 1 : 0);
    }, 0);
  };

  // Get answers for summary
  const getAnswersForSummary = () => {
    return Object.entries(selectedAnswers).map(([questionNum, selectedId]) => {
      const questionIndex = parseInt(questionNum) - 1;
      const question = questions[questionIndex];
      const selectedOption = question.options.find((opt) => opt.id === selectedId);
      const isCorrect = selectedOption?.isCorrect || false;

      return {
        questionNumber: parseInt(questionNum),
        questionText: question.question,
        selectedOption: selectedOption?.text || 'No answer',
        isCorrect,
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
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

  const handleRetry = () => {
    setCurrentQuestion(1);
    setSelectedAnswers({});
    setShowSummary(false);
  };

  const handleFinish = () => {
    // Navigate to lessons or dashboard
    window.location.href = '/lessons';
  };

  if (showSummary) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <SummaryResult
          score={calculateScore()}
          totalQuestions={totalQuestions}
          answers={getAnswersForSummary()}
          onRetry={handleRetry}
          onFinish={handleFinish}
        />
      </PageLayout>
    );
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