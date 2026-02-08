import Mascot from '@assets/dashboard/start-convo.svg';
import type { Message } from '@/types';

interface BotMessageProps {
  message: Message;
}

const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex gap-2 sm:gap-4 max-w-[90%] sm:max-w-xl flex-row">
        <div className="flex-shrink-0 pt-1">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-md">
            <img src={Mascot} alt="AI Tutor" className="w-8 h-8 sm:w-12 sm:h-12" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="px-4 py-3 sm:px-6 sm:py-4 rounded-3xl shadow-md hover:shadow-lg transition-all bg-white text-lessongray-800 border border-lessongray-200 rounded-bl-lg">
            <p className="text-sm sm:text-base leading-relaxed font-rubik">
              {message.text}
            </p>
          </div>
          <span className="text-[10px] sm:text-xs text-lessongray-400 px-2 text-left">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
