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
  return (
    <div className="flex gap-4 justify-between mt-12">
      <button
        onClick={onBack}
        disabled={currentQuestion === 1}
        className={`flex-1 py-3 rounded-lg font-semibold transition font-rubik ${
          currentQuestion === 1
            ? 'bg-lessongray-300 text-lessongray-500 cursor-not-allowed'
            : 'bg-lessongray-500 text-white hover:bg-lessongray-600'
        }`}
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={currentQuestion === totalQuestions}
        className={`flex-1 text-white py-3 rounded-lg font-semibold transition font-rubik ${
          currentQuestion === totalQuestions
            ? 'bg-lessongray-300 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
