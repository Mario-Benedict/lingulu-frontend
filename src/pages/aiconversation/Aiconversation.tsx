import { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, Info } from 'lucide-react';
import Sidebar from '@components/common/Sidebar';
import Mascot from '@assets/dashboard/start-convo.svg';
import type { Message } from '@/types';

const Aiconversation: React.FC = () => {
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
    <div className="flex h-screen bg-lessongray-100 w-screen">
      {/* Sidebar Global */}
      <div className="hidden md:block">
        <Sidebar activeMenu="conversation" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2">
          <div className="flex justify-between items-center px-8 py-6">
            <div>
              <h2 className="text-5xl font-bold text-primary font-rubik">AI Conversation</h2>
              <p className="text-lessongray-500 text-lg font-rubik">Practice speaking</p>
            </div>
            <div className="relative">
              <button className="p-3 hover:bg-lessongray-100 rounded-full peer">
                <Info size={32} className="text-primary" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-lessongray-200 p-4 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible transition-all duration-200 z-20 pointer-events-none">
                <h4 className="font-semibold text-lessongray-800 font-rubik mb-2">Tentang AI Conversation</h4>
                <p className="text-sm text-lessongray-600 font-poppins leading-relaxed">
                  Latih kemampuan berbicara Bahasa Inggris Anda dengan AI tutor. Tekan tombol mikrofon untuk mulai berbicara dan dapatkan respons secara real-time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 bg-gradient-to-b from-lessongray-50 to-white">
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
                          ? 'bg-white text-lessongray-800 border border-lessongray-200 rounded-bl-lg'
                          : 'bg-gradient-to-r from-primary to-primary text-white rounded-br-lg'
                      }`}
                    >
                      <p className={`text-sm lg:text-base leading-relaxed ${
                        message.type === 'bot' ? 'font-rubik' : 'font-poppins font-medium'
                      }`}>
                        {message.text}
                      </p>
                    </div>
                    <span className={`text-xs text-lessongray-400 px-2 ${
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
              <div className="flex-1 h-px bg-lessongray-300"></div>
            </div>

            {/* Tap to Speak Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleTapToSpeak}
                className={`w-full py-4 rounded-full font-semibold font-poppins text-lg transition flex items-center justify-center gap-2 ${
                  isRecording
                    ? 'bg-record-red hover:bg-record-red-dark text-white'
                    : 'bg-primary hover:bg-primary-dark text-white'
                }`}
              >
                <Mic size={24} />
                {isRecording ? 'RECORDING...' : 'TAP TO SPEAK'}
              </button>

              {/* Listen Again Button */}
              <button
                onClick={handleListenAgain}
                className="flex items-center gap-2 text-lessongray-600 hover:text-lessongray-800 transition font-poppins"
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

export default Aiconversation;