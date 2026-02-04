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
    <div className="mb-8">
      {/* Question */}
      <div className="mb-6 border-b border-lessongray-200 pb-4">
        <h3 className="text-xl font-semibold text-lessongray-700 mb-2 font-rubik">
          Soal {questionNumber}
        </h3>
        <p className="text-lg text-lessongray-600 font-poppins">{questionText}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
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
    </div>
  );
};

export default MultipleChoiceQuestion;
