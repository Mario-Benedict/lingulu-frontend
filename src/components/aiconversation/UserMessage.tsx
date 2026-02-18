import { useState, useRef, useEffect } from 'react';
import { Volume2, Pause } from 'lucide-react';
import type { ConversationMessage } from '@/types';

interface UserMessageProps {
  message: ConversationMessage;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
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
    <div className="flex justify-end animate-fadeIn">
      <div className="flex gap-2 sm:gap-4 max-w-[90%] sm:max-w-xl flex-row-reverse">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-start gap-2 justify-end">
            {message.audioUrl && (
              <button
                onClick={handlePlayAudio}
                className={`mt-3 p-2 rounded-full transition-all flex-shrink-0 ${
                  isPlaying
                    ? 'bg-white text-primary'
                    : 'bg-white/30 text-white hover:bg-white hover:text-primary'
                }`}
                aria-label="Play audio"
              >
                {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
              </button>
            )}
            <div className="flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-3xl shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-primary text-white rounded-br-lg">
              <p className="text-sm sm:text-base leading-relaxed font-poppins font-medium">
                {message.text}
              </p>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs text-lessongray-400 px-2 text-right">
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
