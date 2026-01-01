import React from 'react';
import { Home, BookOpen, Trophy, BotMessageSquare, User, Bell, ChartColumn, Flame} from 'lucide-react';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = React.useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn },
    { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-orange-500">🐯 Lingulu</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="pt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full px-6 py-3 flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white border-r-4 border-orange-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-large">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className='bg-white shadow-sm sticky flex justify-end items-center px-8 py-4'>
          <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={32} className="text-orange-500" />
            </button>
        </div>
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-orange-500 border-b-2">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-5xl font-bold text-orange-500">WELCOME BACK, Nicko!</h2>
            
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main Content */}
              <div className="flex-1 flex flex-col gap-6">
                {/* Learning Progress Card */}
                <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg p-8 text-white shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-semibold opacity-90 mb-2">Learning Progress</div>
                    <h3 className="text-7xl font-bold mb-4">Level 1: Beginner</h3>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2"></div>
                  </div>
                  <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition self-end mt-6">
                    Continue
                  </button>
                </div>

                {/* Stats Cards */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Card 1 - Streak */}
                  <div className="flex-1 bg-red-500 rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-5 max-h-[35vh]">
                    <Flame size={48}></Flame>
                    <div className="text-6xl font-bold">200</div>
                    <span className="text-2xl opacity-90">Burning Streak</span>
                  </div>

                  {/* Card 2 - Global Ranking */}
                  <div className="flex-1 bg-yellow-400 rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-5 max-h-[35vh]">
                    <Trophy size={48}></Trophy>
                    <div className="text-6xl font-bold">5</div>
                    <span className="text-2xl opacity-90">Peringkat Global</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Character & CTA */}
              <div className="flex flex-col gap-6 lg:w-80 h-screen max-h-[71vh]">
                {/* Character Card */}
                <div className="bg-white rounded-lg p-6 shadow-lg text-center flex flex-col items-center gap-6 h-full">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-6xl">🐯</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Ready to practice?</div>
                  <h4 className="text-xl font-bold text-gray-800">Let's talk!</h4>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
                    Start Conversation
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}