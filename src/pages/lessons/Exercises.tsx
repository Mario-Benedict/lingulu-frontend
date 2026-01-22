import React, { useState } from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, ArrowLeft, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'

export default function Exercise() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState('lessons');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const totalQuestions = 10;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
    { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, path: '/leaderboard' },
    { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, path: '/conversation' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const questions = [
    {
      id: 1,
      question: 'what does "Good morning" mean in indonesian?',
      type: 'voice'
    },
    {
      id: 2,
      question: 'How do you say "Thank you" in Indonesian?',
      type: 'voice'
    },
    {
      id: 3,
      question: 'Translate "How are you?" to Indonesian',
      type: 'voice'
    },
    // Add more questions as needed
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleMicrophoneClick = () => {
    setIsListening(!isListening);
    // TODO: Implement voice recording logic
    console.log('Microphone clicked');
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
          <div className="px-8 py-5">
            <div className="flex items-center gap-5">
              <button onClick={() => navigate(-1)} className='group transition p-4 hover:bg-gray-50 hover:shadow-orange-500 shadow-lg rounded-lg bg-orange-500'><ArrowLeft className="text-white font-semibold group-hover:text-gray-800" size={28}/></button>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 font-rubik">Lessons 2 : judul soal</h2>
                <p className="text-gray-500 text-lg">{currentQuestion}/{totalQuestions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Question Container */}
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-8">
                <div
                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Question Number and Text */}
              <div className="mb-12 border-b-gray-400 border-b pb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2 font-rubik">
                  Soal {currentQuestion}
                </h3>
                <p className="text-lg text-gray-600 font-poppins">
                  {currentQuestionData?.question}
                </p>
              </div>

              {/* Microphone Section */}
              <div className="flex flex-col items-center justify-center border-b border-b-gray-400 pb-6">
                <button
                  onClick={handleMicrophoneClick}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition shadow-lg hover:shadow-xl ${
                    isListening
                      ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  <Mic size={64} />
                </button>
                <p className="mt-8 text-gray-600 font-poppins">
                  {isListening ? 'Listening...' : 'Tap the microphone to answer'}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 justify-between mt-12">
                <button
                  onClick={handleBack}
                  disabled={currentQuestion === 1}
                  className={`flex-1 py-3 rounded-lg font-semibold transition font-rubik ${
                    currentQuestion === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestion === totalQuestions}
                  className={`flex-1 text-white py-3 rounded-lg font-semibold transition font-rubik ${
                    currentQuestion === totalQuestions
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
