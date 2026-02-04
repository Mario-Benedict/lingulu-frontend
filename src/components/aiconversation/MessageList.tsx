import { useRef, useEffect } from 'react';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import type { Message } from '@/types';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-gradient-to-b from-lessongray-50 to-white">
      <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 shadow-lg rounded-lg">
        {messages.map((message) => (
          message.type === 'bot' ? (
            <BotMessage key={message.id} message={message} />
          ) : (
            <UserMessage key={message.id} message={message} />
          )
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
