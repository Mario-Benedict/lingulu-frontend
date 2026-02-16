interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  onBack: () => void;
  onNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestion,
  totalQuestions,
  onBack,
  onNext,
}) => {
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="flex gap-3 sm:gap-4 justify-between mt-2 sm:mt-8 md:mt-4">
      <button
        onClick={onBack}
        disabled={currentQuestion === 1}
        className={`flex-1 py-2 sm:py-3 rounded-lg font-semibold transition font-rubik text-sm sm:text-base ${
          currentQuestion === 1
            ? 'bg-lessongray-300 text-lessongray-500 cursor-not-allowed'
            : 'bg-lessongray-500 text-white hover:bg-lessongray-600'
        }`}
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="flex-1 text-white py-2 sm:py-3 rounded-lg font-semibold transition font-rubik text-sm sm:text-base bg-primary hover:bg-primary-dark"
      >
        {isLastQuestion ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default NavigationButtons;
