import { useState, useRef, useEffect } from 'react';
import Mascot from '@assets/dashboard/start-convo.svg';
import { Volume2, Pause } from 'lucide-react';
import type { ConversationMessage } from '@/types';

interface BotMessageProps {
  message: ConversationMessage;
}

const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  const timestamp = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (message.audioUrl) {
      const audio = new Audio(message.audioUrl);
      audio.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current = audio;
      
      return () => {
        audio.pause();
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [message.audioUrl]);

  const handlePlayAudio = () => {
    if (!audioRef.current) return;

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
    <div className="flex justify-start animate-fadeIn">
      <div className="flex gap-2 sm:gap-4 max-w-[90%] sm:max-w-xl flex-row">
        <div className="flex-shrink-0 pt-1">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-md">
            <img src={Mascot} alt="AI Tutor" className="w-8 h-8 sm:w-12 sm:h-12" />
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-start gap-2">
            <div className="flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-3xl shadow-md hover:shadow-lg transition-all bg-white text-lessongray-800 border border-lessongray-200 rounded-bl-lg">
              <p className="text-sm sm:text-base leading-relaxed font-rubik">
                {message.text}
              </p>
            </div>
            {message.audioUrl && (
              <button
                onClick={handlePlayAudio}
                className={`mt-3 p-2 rounded-full transition-all flex-shrink-0 ${
                  isPlaying
                    ? 'bg-primary text-white'
                    : 'bg-lessongray-100 text-primary hover:bg-primary hover:text-white'
                }`}
                aria-label="Play audio"
              >
                {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
              </button>
            )}
          </div>
          <span className="text-[10px] sm:text-xs text-lessongray-400 px-2 text-left">
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
