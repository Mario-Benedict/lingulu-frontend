import MultipleChoiceOption from './MultipleChoiceOption';

interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface MultipleChoiceQuestionProps {
  questionNumber: number;
  questionText: string;
  options: Option[];
  selectedOptionId: string | null;
  showResult?: boolean;
  onSelectOption: (optionId: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionNumber,
  questionText,
  options,
  selectedOptionId,
  showResult,
  onSelectOption,
}) => {
  return (
    <div className="mb-2 sm:mb-3 md:mb-2">
      {/* Question */}
      <div className="mb-4 sm:mb-6 border-b border-lessongray-200 pb-3 sm:pb-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-lessongray-700 mb-1 sm:mb-2 font-rubik">
          Soal {questionNumber}
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-lessongray-600 font-poppins">{questionText}</p>
      </div>

      {/* Options */}
      <div className="space-y-2 sm:space-y-3 pb-4">
        {options.map((option) => (
          <MultipleChoiceOption
            key={option.id}
            id={option.id}
            text={option.text}
            isSelected={selectedOptionId === option.id}
            isCorrect={option.isCorrect}
            showResult={showResult}
            onClick={() => onSelectOption(option.id)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-lessongray-300 mt-4 sm:mt-5 md:mt-3"></div>
    </div>
  );
};

export default MultipleChoiceQuestion;
