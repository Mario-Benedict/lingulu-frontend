import type { Message } from '@/types';

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end animate-fadeIn">
      <div className="flex gap-4 max-w-xl flex-row-reverse">
        <div className="flex flex-col gap-1">
          <div className="px-6 py-4 rounded-3xl shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-primary text-white rounded-br-lg">
            <p className="text-sm lg:text-base leading-relaxed font-poppins font-medium">
              {message.text}
            </p>
          </div>
          <span className="text-xs text-lessongray-400 px-2 text-right">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
