import React from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'
import learningMapBg from '@assets/lessons/learning-map.svg'

interface Lesson {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
}

export default function LearningMap() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState('lessons');
  const [lessons] = React.useState<Lesson[]>([
    {
      id: 1,
      title: 'Lesson 1',
      description: 'Introduction',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Lesson 2',
      description: 'Basic Phrases',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Lesson 3',
      description: 'Conversations',
      status: 'locked'
    },
    {
      id: 4,
      title: 'Lesson 4',
      description: 'Advanced',
      status: 'locked'
    }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
    { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, path: '/leaderboard' },
    { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, path: '/conversation' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-2 border-green-600 hover:shadow-green-700';
      case 'in-progress':
        return 'bg-orange-500 border-2 border-orange-600 hover:shadow-orange-700';
      case 'locked':
        return 'bg-gray-400 border-2 border-gray-500 hover:shadow-red-800';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusIcon = (status: string, lessonId: number) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={40} className="text-white" />;
      case 'in-progress':
        return <span className="text-white font-bold text-3xl">{lessonId}</span>;
      case 'locked':
        return <Lock size={40} className="text-white" />;
      default:
        return null;
    }
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
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        {/* Main Learning Map Area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${learningMapBg})`,
            }}
          />
            <div className='bg-white w-fit bg-opacity-70 flex flex-1 gap-5 p-5 mt-5 ml-5 absolute z-10 rounded-lg'>
                <button className='group transition p-4 hover:bg-gray-50 hover:shadow-orange-500 shadow-lg rounded-lg bg-orange-500'><ArrowLeft className="text-white font-semibold group-hover:text-gray-800" size={28}/></button>
                <div className='flex flex-1 flex-col'>
                    <h2 className='text-gray-800 text-2xl font-semibold font-rubik'>Basic English Conversation</h2>
                    <p className='text-gray-600 text-lg'>4 Lessons - Beginner</p>
                </div>
            </div>
          {/* Lessons Container - Vertical Layout */}
          <div className="relative w-full h-full flex items-center justify-center font-poppins">
            <div className="flex flex-col gap-[5.5rem] items-end pl-10 pt-[6rem]">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="flex flex-col items-end">
                  {/* Circle Button */}
                  <button
                    onClick={() => {
                      if (lesson.status !== 'locked') {
                        // Navigate to lesson
                      }
                    }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 hover:shadow-2xl border-8 border-gray-100 border-b-12 transform -translate-x-4 ${getStatusColor(
                      lesson.status
                    )} ${lesson.status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={lesson.status === 'locked'}
                  >
                    {getStatusIcon(lesson.status, lesson.id)}
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
