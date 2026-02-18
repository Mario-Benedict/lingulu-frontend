import { useState, useRef, useEffect } from 'react';
import MicrophoneButton from './MicrophoneButton';
import { Volume2, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PronunciationQuestionProps {
  questionText: string;
  audioPath: string;
  isListening: boolean;
  isProcessing?: boolean;
  onMicrophoneClick: () => void;
  isAnswered?: boolean;
}

const PronunciationQuestion: React.FC<PronunciationQuestionProps> = ({
  questionText,
  audioPath,
  isListening,
  isProcessing = false,
  onMicrophoneClick,
  isAnswered = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useTranslation();

  // Reset audio when audioPath changes (question changes)
  useEffect(() => {
    // Cleanup previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioPath]);

  const handlePlayAudio = () => {
    if (!audioRef.current || audioRef.current.src !== audioPath) {
      // Stop previous audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
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
            {t('lessons.say')} &quot;{questionText}&quot;
          </span>
          {audioPath && (
            <button
              onClick={handlePlayAudio}
              className="p-2 rounded-full bg-primary hover:bg-primary-dark transition-colors shrink-0"
              aria-label={isPlaying ? t('lessons.pauseAudio') : t('lessons.playAudio')}
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Volume2 size={20} className="text-white" />
              )}
            </button>
          )}
        </div>
      </div>
      <MicrophoneButton
        isListening={isListening}
        isProcessing={isProcessing}
        onClick={onMicrophoneClick}
        isAnswered={isAnswered}
      />
    </div>
  );
};

export default PronunciationQuestion;
