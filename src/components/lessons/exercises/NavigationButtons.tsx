interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  isRetryDisabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestion,
  totalQuestions,
  onBack,
  onNext,
  isNextDisabled = false,
  isRetryDisabled = false,
}) => {
  const isLastQuestion = currentQuestion === totalQuestions;
  const isFirstQuestion = currentQuestion === 1;

  return (
    <div className="flex gap-3 sm:gap-4 justify-between mt-2 sm:mt-8 md:mt-4">
      {!isFirstQuestion && (
        <button
          onClick={onBack}
          disabled={isRetryDisabled}
          className={`flex-1 py-2 sm:py-3 rounded-lg font-semibold transition font-rubik text-sm sm:text-base ${
            isRetryDisabled
              ? 'bg-lessongray-300 text-lessongray-500 cursor-not-allowed'
              : 'bg-lessongray-500 text-white hover:bg-lessongray-600'
          }`}
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`flex-1 text-white py-2 sm:py-3 rounded-lg font-semibold transition font-rubik text-sm sm:text-base ${
          isNextDisabled
            ? 'bg-lessongray-300 text-lessongray-500 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark'
        }`}
      >
        {isLastQuestion ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default NavigationButtons;
