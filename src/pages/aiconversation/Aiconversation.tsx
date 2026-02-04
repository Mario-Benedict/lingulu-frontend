import { useState } from 'react';
import Sidebar from '@components/common/Sidebar';
import ConversationHeader from '@components/aiconversation/ConversationHeader';
import MessageList from '@components/aiconversation/MessageList';
import ConversationInput from '@components/aiconversation/ConversationInput';
import type { Message } from '@/types';

const Aiconversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello Nicko. I'm your english tutor, are you ready to speak with me?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      type: 'user',
      text: "Yes, I'm ready to learn English today.",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      type: 'bot',
      text: 'Great! Let\'s start with a simple conversation. Can you tell me about your favorite hobby?',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: '4',
      type: 'user',
      text: 'I like playing football and reading books.',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '5',
      type: 'bot',
      text: 'That sounds wonderful! Both are great activities. Why do you enjoy reading books?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleTapToSpeak = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      console.log('Started recording');
    } else {
      // Stop recording
      console.log('Stopped recording');
    }
  };

  const handleListenAgain = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  return (
    <div className="flex h-screen bg-lessongray-100 w-screen">
      {/* Sidebar Global */}
      <div className="hidden md:block">
        <Sidebar activeMenu="conversation" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ConversationHeader />
        <MessageList messages={messages} />
        <ConversationInput
          isRecording={isRecording}
          onTapToSpeak={handleTapToSpeak}
          onListenAgain={handleListenAgain}
        />
      </div>
    </div>
  );
}

export default Aiconversation;