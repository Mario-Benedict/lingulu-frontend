interface MultipleChoiceOptionProps {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  onClick: () => void;
}

const MultipleChoiceOption: React.FC<MultipleChoiceOptionProps> = ({
  text,
  isSelected,
  isCorrect,
  showResult,
  onClick,
}) => {
  const getOptionStyle = () => {
    if (showResult && isSelected) {
      if (isCorrect) {
        return 'border-2 border-green-500 bg-green-50';
      }
      return 'border-2 border-red-500 bg-red-50';
    }
    if (isSelected) {
      return 'border-2 border-primary bg-primary/5';
    }
    return 'border border-lessongray-300 hover:border-primary hover:bg-lessongray-50';
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg flex items-center gap-4 transition-all ${getOptionStyle()}`}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          isSelected
            ? showResult && isCorrect
              ? 'border-green-500 bg-green-500'
              : showResult && !isCorrect
              ? 'border-red-500 bg-red-500'
              : 'border-primary bg-primary'
            : 'border-lessongray-400'
        }`}
      >
        {isSelected && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="text-lg text-lessongray-700 font-poppins text-left">{text}</span>
    </button>
  );
};

export default MultipleChoiceOption;
