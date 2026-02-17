import { useState, useRef } from 'react';
import QuestionCard from './QuestionCard';
import MicrophoneButton from './MicrophoneButton';
import { Volume2, Pause } from 'lucide-react';

interface PronunciationQuestionProps {
  questionNumber: number;
  questionText: string;
  audioPath: string;
  isListening: boolean;
  onMicrophoneClick: () => void;
  isAnswered?: boolean;
}

const PronunciationQuestion: React.FC<PronunciationQuestionProps> = ({
  questionNumber,
  questionText,
  audioPath,
  isListening,
  onMicrophoneClick,
  isAnswered = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioPath);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg">
          <span className="text-lessongray-800 font-poppins text-lg">
            Say: &quot;{questionText}&quot;
          </span>
          <button
            onClick={handlePlayAudio}
            className="p-2 rounded-full bg-primary hover:bg-primary-dark transition-colors shrink-0"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Volume2 size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>
      <MicrophoneButton isListening={isListening} onClick={onMicrophoneClick} isAnswered={isAnswered} />
    </div>
  );
};

export default PronunciationQuestion;
