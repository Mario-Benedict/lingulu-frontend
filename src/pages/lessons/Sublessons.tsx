import React from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, ArrowLeft, BookOpenText, NotebookPen} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'

export default function Sublessons() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState('lessons');

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
      icon: BookOpenText,
      type: 'material'
    },
    {
      id: 2,
      title: 'Judul Soal',
      icon: NotebookPen,
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
      <div className="flex-1 flex flex-col min-w-0 font-poppins">

        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-orange-500 border-b-2 py-2">
          <div className="flex items-center px-8 py-4 gap-6">
            <button onClick={() => navigate('/lessons/map')} className='group transition p-4 hover:bg-gray-50 hover:shadow-orange-500 shadow-lg rounded-lg bg-orange-500'><ArrowLeft className="text-white font-semibold group-hover:text-gray-800" size={28}/></button>
            <div>
              <p className="text-lg text-gray-600">Level 1: Beginner</p>
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
                    <div className="p-3">
                      {React.createElement(sublesson.icon, {
                        size: 48,
                        className: "text-orange-500"
                      })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {sublesson.title}
                      </h3>
                    </div>
                  </div>
                  <button onClick={() => navigate('/material')} className="bg-orange-500 text-white px-10 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
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
