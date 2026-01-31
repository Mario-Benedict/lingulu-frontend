import React, { useState } from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, ArrowLeft, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

export default function Exercise() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState('lessons');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const totalQuestions = 10;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;


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
    <div className="flex h-screen bg-lessongray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2">
          <div className="px-8 py-5">
            <div className="flex items-center gap-5">
              <button onClick={() => navigate(-1)} className='group transition p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary'><ArrowLeft className="text-white font-semibold group-hover:text-lessongray-800" size={28}/></button>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-lessongray-800 font-rubik">Lessons 2 : judul soal</h2>
                <p className="text-lessongray-500 text-lg">{currentQuestion}/{totalQuestions}</p>
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
              <div className="w-full bg-lessongray-200 rounded-full h-3 overflow-hidden mb-8">
                <div
                  className="bg-gradient-to-r from-primary to-primary h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Question Number and Text */}
              <div className="mb-12 border-b-lessongray-400 border-b pb-6">
                <h3 className="text-xl font-semibold text-lessongray-700 mb-2 font-rubik">
                  Soal {currentQuestion}
                </h3>
                <p className="text-lg text-lessongray-600 font-poppins">
                  {currentQuestionData?.question}
                </p>
              </div>

              {/* Microphone Section */}
              <div className="flex flex-col items-center justify-center border-b border-b-lessongray-400 pb-6">
                <button
                  onClick={handleMicrophoneClick}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition shadow-lg hover:shadow-xl ${
                    isListening
                      ? 'bg-record-red text-white hover:bg-record-red-dark animate-pulse'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  <Mic size={64} />
                </button>
                <p className="mt-8 text-lessongray-600 font-poppins">
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
                      ? 'bg-lessongray-300 text-lessongray-500 cursor-not-allowed'
                      : 'bg-lessongray-500 text-white hover:bg-lessongray-600'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestion === totalQuestions}
                  className={`flex-1 text-white py-3 rounded-lg font-semibold transition font-rubik ${
                    currentQuestion === totalQuestions
                      ? 'bg-lessongray-300 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-dark'
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
