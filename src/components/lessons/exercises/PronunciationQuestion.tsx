import QuestionCard from './QuestionCard';
import MicrophoneButton from './MicrophoneButton';

interface PronunciationQuestionProps {
  questionNumber: number;
  questionText: string;
  isListening: boolean;
  onMicrophoneClick: () => void;
}

const PronunciationQuestion: React.FC<PronunciationQuestionProps> = ({
  questionNumber,
  questionText,
  isListening,
  onMicrophoneClick,
}) => {
  return (
    <div className="flex flex-col">
      <QuestionCard questionNumber={questionNumber} questionText={questionText} />
      <MicrophoneButton isListening={isListening} onClick={onMicrophoneClick} />
    </div>
  );
};

export default PronunciationQuestion;
