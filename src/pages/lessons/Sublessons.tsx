import React from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, ArrowLeft, Bell } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'
import materiIcon from '@assets/lessons/beginner.svg';

export default function Sublessons() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState('lessons');
  const { levelId } = useParams();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
    { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, path: '/leaderboard' },
    { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, path: '/conversation' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const sublessons = [
    {
      id: 1,
      title: 'Judul materi',
      icon: materiIcon,
      type: 'material'
    },
    {
      id: 2,
      title: 'Judul Soal',
      icon: materiIcon,
      type: 'exercise'
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
        <div className='bg-white shadow-sm sticky flex justify-between items-center px-8 py-4'>
          <button
            onClick={() => navigate('/lessons/map')}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold"
          >
            <ArrowLeft size={24} />
            <span className="font-rubik">Back</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={32} className="text-orange-500" />
          </button>
        </div>

        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-orange-500 border-b-2">
          <div className="flex justify-between items-center px-8 py-4">
            <div>
              <p className="text-sm text-gray-600 font-rubik">Level 1: Beginner</p>
              <h2 className="text-5xl font-bold text-orange-500 font-rubik">Lessons 2</h2>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="space-y-4">
              {sublessons.map((sublesson) => (
                <div
                  key={sublesson.id}
                  className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 rounded-lg p-3">
                      <img 
                        src={sublesson.icon} 
                        alt={sublesson.title}
                        className="w-12 h-12"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 font-rubik">
                        {sublesson.title}
                      </h3>
                    </div>
                  </div>
                  <button className="bg-orange-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-orange-600 transition font-rubik">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
