import React from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'
import Beginner from '@assets/lessons/beginner.svg';
import Intermediate from '@assets/lessons/intermediate.svg';
import Advanced from '@assets/lessons/advance.svg';

export default function Lessons() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState('lessons');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
    { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, path: '/leaderboard' },
    { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, path: '/conversation' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const levels = [
    {
      id: 1,
      title: 'Level 1: Beginner',
      description: 'Start your journey! Basic words & phrases.',
      bgColor: 'bg-gradient-to-br from-amber-300 to-orange-600',
      isLocked: false,
      buttonText: 'Start Learn',
      buttonColor: 'bg-white text-gray-700 hover:bg-gray-100',
      mascotImage: Beginner,
      progress: 45
    },
    {
      id: 2,
      title: 'Level 2: Intermediate',
      description: 'Conversational skills. Speak with confidence.',
      bgColor: 'bg-gradient-to-br from-teal-300 to-cyan-600',
      isLocked: true,
      buttonText: 'Locked',
      buttonColor: 'bg-gray-300 text-gray-600',
      lockMessage: 'Unlock by completing Level 2',
      mascotImage: Intermediate
    },
    {
      id: 3,
      title: 'Level 3: Advanced',
      description: 'Mastery & fluency. Complex topics.',
      bgColor: 'bg-gradient-to-br from-violet-300 to-purple-700',
      isLocked: true,
      buttonText: 'Locked',
      buttonColor: 'bg-gray-300 text-gray-600',
      lockMessage: 'Unlock by completing Level 3',
      mascotImage: Advanced
    }
  ];

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
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-orange-500 border-b-2 pt-[2.5rem]">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-7xl font-bold text-orange-500 font-rubik">Start Your Journey</h2>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex flex-col gap-6 mx-auto">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className={`${level.bgColor} rounded-lg p-8 py-0 text-white shadow-lg flex items-center gap-2 min-h-64 overflow-hidden px-auto`}
                >
                  {/* Character Image */}
                  <div className="flex-shrink-0 h-auto flex items-center justify-center flex-col">
                    <img
                      src={level.mascotImage}
                      alt={level.title}
                      className="w-51 h-51 object-fill ml-0"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-5xl font-bold mb-3 font-rubik">{level.title}</h3>
                      <p className="text-2xl font-poppins mb-6 opacity-95">
                        {level.description}
                      </p>
                    </div>

                    {/* Lock/Button Section */}
                    {level.isLocked ? (
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white bg-opacity-20 rounded-lg px-4 py-3 flex items-center gap-3 flex-row">
                          <Lock size={24} />
                          <span className="text-lg font-poppins"> {level.lockMessage}</span>
                        </div>
                        <button
                          className={`${level.buttonColor} px-8 py-3 rounded-lg font-semibold transition font-rubik`}
                          disabled
                        >
                          {level.buttonText}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        {level.progress !== undefined && (
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-lg font-poppins opacity-90">Progress</span>
                              <span className="text-lg font-poppins font-semibold">{level.progress}%</span>
                            </div>
                            <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-white h-full rounded-full transition-all duration-500"
                                style={{ width: `${level.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        <button
                          onClick={() => navigate(`/lessons/map`)}
                          className={`${level.buttonColor} px-8 py-3 rounded-lg font-semibold transition font-rubik flex-shrink-0`}
                        >
                          {level.buttonText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
