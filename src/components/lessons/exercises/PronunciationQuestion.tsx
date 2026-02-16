import QuestionCard from './QuestionCard';
import MicrophoneButton from './MicrophoneButton';

interface PronunciationQuestionProps {
  questionNumber: number;
  questionText: string;
  isListening: boolean;
  onMicrophoneClick: () => void;
  isAnswered?: boolean;
}

const PronunciationQuestion: React.FC<PronunciationQuestionProps> = ({
  questionNumber,
  questionText,
  isListening,
  onMicrophoneClick,
  isAnswered = false,
}) => {
  return (
    <div className="flex flex-col">
      <QuestionCard questionNumber={questionNumber} questionText={questionText} />
      <MicrophoneButton isListening={isListening} onClick={onMicrophoneClick} isAnswered={isAnswered} />
    </div>
  );
};

export default PronunciationQuestion;
