import React, { useState, useRef, useEffect } from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, Mic, Volume2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg';
import Mascot from '@assets/dashboard/start-convo.svg';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export default function Aiconversation() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState('conversation');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello Nicko. I'm your english tutor, are you ready to speak with me?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
    { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, path: '/leaderboard' },
    { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, path: '/conversation' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: inputValue,
        timestamp: new Date()
      };
      setMessages([...messages, userMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'That\'s great! Keep practicing your English skills.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

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
    <div className="flex h-screen bg-gray-100 w-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo */}
        <div className="py-2 border-b">
          <img src={sidebarLogo} alt="Lingulu Logo" className="h-16 mx-auto" />
        </div>

        {/* Navigation Menu */}
        <nav className="pt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  navigate(item.path);
                }}
                className={`w-full px-6 py-3 flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white border-r-4 border-orange-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-large font-rubik">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-orange-500 border-b-2">
          <div className="flex justify-between items-center px-8 py-6">
            <div>
              <h2 className="text-5xl font-bold text-orange-500 font-rubik">AI Conversation</h2>
              <p className="text-gray-500 text-lg font-rubik">Practice speaking</p>
            </div>
            <button className="p-3 hover:bg-gray-100 rounded-full">
              <Info size={32} className="text-orange-500" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 shadow-lg rounded-lg h-full">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeIn`}
              >
                <div
                  className={`flex gap-4 max-w-xl ${
                    message.type === 'bot' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 pt-1">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                        <img src={Mascot} alt="AI Tutor" className="w-12 h-12" />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`px-6 py-4 rounded-3xl shadow-md hover:shadow-lg transition-all ${
                        message.type === 'bot'
                          ? 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                          : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-br-lg'
                      }`}
                    >
                      <p className={`text-sm lg:text-base leading-relaxed ${
                        message.type === 'bot' ? 'font-rubik' : 'font-poppins font-medium'
                      }`}>
                        {message.text}
                      </p>
                    </div>
                    <span className={`text-xs text-gray-400 px-2 ${
                      message.type === 'bot' ? 'text-left' : 'text-right'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white px-8 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Message Input Form */}
            {/* <form onSubmit={handleSendMessage} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-rubik"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-rubik font-semibold"
                >
                  Send
                </button>
              </div>
            </form> */}

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Tap to Speak Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleTapToSpeak}
                className={`w-full py-4 rounded-full font-semibold font-poppins text-lg transition flex items-center justify-center gap-2 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                <Mic size={24} />
                {isRecording ? 'RECORDING...' : 'TAP TO SPEAK'}
              </button>

              {/* Listen Again Button */}
              <button
                onClick={handleListenAgain}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition font-poppins"
              >
                <Volume2 size={18} />
                Listen again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
