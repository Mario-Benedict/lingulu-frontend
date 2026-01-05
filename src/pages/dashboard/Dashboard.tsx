import React from 'react';
import { Home, BookOpen, Trophy, BotMessageSquare, User, Bell, ChartColumn, Flame} from 'lucide-react';
import startConvo from '@assets/dashboard/start-convo.svg'
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'

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
                onClick={() => setActiveMenu(item.id)}
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
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-orange-500 border-b-2">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-5xl font-bold text-orange-500 font-rubik">WELCOME BACK, Nicko!</h2>
            
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Learning Progress Card */}
                <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg p-6 text-white shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-semibold opacity-90 mb-2 font-rubik">Learning Progress</div>
                    <h3 className="text-6xl font-bold mb-4 font-poppins">Level 1: Beginner</h3>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2"></div>
                  </div>
                  <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition self-end mt-6 font-rubik">
                    Continue
                  </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1 - Streak */}
                  <div className="flex-1 bg-red-500 rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 w-full max-h-[34vh]">
                    <Flame size={48}></Flame>
                    <div className="text-6xl font-bold font-rubik">200</div>
                    <span className="text-xl font-poppins">Burning Streak</span>
                  </div>

                  {/* Card 2 - Global Ranking */}
                  <div className="flex-1 bg-yellow-400 rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 max-h-[34vh] w-full">
                    <Trophy size={48}></Trophy>
                    <div className="text-6xl font-bold font-rubik">5</div>
                    <span className="text-xl font-poppins">Peringkat Global</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Character & CTA */}
              <div className="flex flex-col gap-6 lg:col-span-1">
                {/* Character Card */}
                <div className="bg-white rounded-lg p-6 shadow-lg text-center flex flex-col items-center gap-6 h-full font-poppins">
                  <div className="w-48 h-48 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center mt-4">
                    <img src={startConvo} alt="" className='w-full h-full object-cover rounded-full'/>
                  </div>
                  <div className="text-2xl font-semibold text-gray-700 bg-gray-300 p-4 mt-4 rounded-lg">Ready to practice? <br /> Let's talk!</div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition mt-auto shadow-lg">
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