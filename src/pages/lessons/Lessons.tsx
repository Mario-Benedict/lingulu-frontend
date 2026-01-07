import React from 'react';
import { Home, BookOpen, Trophy, BotMessageSquare, User, Bell, ChartColumn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'
import level1Char from '@assets/dashboard/start-convo.svg'

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
      bgColor: 'bg-gradient-to-r from-amber-400 to-yellow-400',
      isLocked: false,
      buttonText: 'Start Learn',
      buttonColor: 'bg-white text-gray-700 hover:bg-gray-100'
    },
    {
      id: 2,
      title: 'Level 2: Intermediate',
      description: 'Conversational skills. Speak with confidence.',
      bgColor: 'bg-gradient-to-r from-teal-400 to-cyan-400',
      isLocked: true,
      buttonText: 'Locked',
      buttonColor: 'bg-gray-300 text-gray-600',
      lockMessage: 'Unlock by completing Level 1'
    },
    {
      id: 3,
      title: 'Level 3: Advanced',
      description: 'Mastery & fluency. Complex topics.',
      bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
      isLocked: true,
      buttonText: 'Locked',
      buttonColor: 'bg-gray-300 text-gray-600',
      lockMessage: 'Unlock by completing Level 2'
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
        {/* Top Bar */}
        <div className='bg-white shadow-sm sticky flex justify-end items-center px-8 pt-4'>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={32} className="text-orange-500" />
          </button>
        </div>

        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-orange-500 border-b-2">
          <div className="flex justify-between items-center px-8 py-6">
            <h2 className="text-5xl font-bold text-orange-500 font-rubik">Start Your Journey</h2>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex flex-col gap-6 max-w-4xl">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className={`${level.bgColor} rounded-lg p-8 text-white shadow-lg flex items-center gap-8 min-h-64 overflow-hidden`}
                >
                  {/* Character Image */}
                  <div className="flex-shrink-0 w-56 h-56 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center flex-col">
                    <img
                      src={level1Char}
                      alt={level.title}
                      className="w-48 h-48 object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-4xl font-bold mb-3 font-rubik">{level.title}</h3>
                      <p className="text-lg font-poppins mb-6 opacity-95">
                        {level.description}
                      </p>
                    </div>

                    {/* Lock/Button Section */}
                    {level.isLocked ? (
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white bg-opacity-30 rounded-lg px-4 py-3 flex items-center gap-3">
                          <span className="text-lg font-poppins">🔒 {level.lockMessage}</span>
                        </div>
                        <button
                          className={`${level.buttonColor} px-8 py-3 rounded-lg font-semibold transition font-rubik`}
                          disabled
                        >
                          {level.buttonText}
                        </button>
                      </div>
                    ) : (
                      <button
                        className={`${level.buttonColor} px-8 py-3 rounded-lg font-semibold transition font-rubik self-end`}
                      >
                        {level.buttonText}
                      </button>
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
