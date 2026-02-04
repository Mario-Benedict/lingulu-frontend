import Mascot from '@assets/dashboard/start-convo.svg';
import type { Message } from '@/types';

interface BotMessageProps {
  message: Message;
}

const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div className="flex gap-4 max-w-xl flex-row">
        <div className="flex-shrink-0 pt-1">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md">
            <img src={Mascot} alt="AI Tutor" className="w-12 h-12" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="px-6 py-4 rounded-3xl shadow-md hover:shadow-lg transition-all bg-white text-lessongray-800 border border-lessongray-200 rounded-bl-lg">
            <p className="text-sm lg:text-base leading-relaxed font-rubik">
              {message.text}
            </p>
          </div>
          <span className="text-xs text-lessongray-400 px-2 text-left">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
