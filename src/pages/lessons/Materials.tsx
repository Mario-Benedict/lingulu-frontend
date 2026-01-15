import React from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, ArrowLeft} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg'

export default function Materials() {
  const navigate = useNavigate();
  const { materialId } = useParams();
  const [activeMenu, setActiveMenu] = React.useState('lessons');
  
  // Determine content type and ID from route
  const contentId = materialId;
  const contentType = 'material';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
    { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, path: '/leaderboard' },
    { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, path: '/conversation' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  // Mock data untuk materials
  const materialsData: Record<string, { id: number; title: string; content: string; levelId: number; order: number }> = {
    '1': { id: 1, title: 'Pengenalan Bahasa', content: 'Materi tentang pengenalan bahasa...', levelId: 1, order: 1 },
    '2': { id: 2, title: 'Tata Bahasa Dasar', content: 'Materi tentang tata bahasa dasar...', levelId: 1, order: 2 },
  };

  // TODO: Exercise data akan dipindahkan ke Exercise.tsx component
  // Struktur exercise data reference untuk Exercise.tsx:
  // const exercisesData: Record<string, { id: number; title: string; content: string; levelId: number; order: number }> = {
  //   '1': { id: 1, title: 'Latihan Kosakata', content: 'Soal latihan kosakata...', levelId: 1, order: 1 },
  //   '2': { id: 2, title: 'Latihan Tata Bahasa', content: 'Soal latihan tata bahasa...', levelId: 1, order: 2 },
  // };

  const currentData = 
    (contentType === 'material' && contentId && contentId in materialsData) ? materialsData[contentId] :
    null;

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
            <button onClick={() => navigate(-1)} className='group transition p-4 hover:bg-gray-50 hover:shadow-orange-500 shadow-lg rounded-lg bg-orange-500'><ArrowLeft className="text-white font-semibold group-hover:text-gray-800" size={28}/></button>
            <div className="text-gray-600">
              <p className="text-lg text-gray-600 font-poppins">Material</p>
              <h2 className="text-5xl font-bold text-orange-500 font-rubik">{currentData?.title || 'Loading...'}</h2>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {currentData ? (
              <div className="space-y-6">
                {/* Content */}
                <div className="bg-white rounded-lg p-8 shadow-md">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentData.title}</h1>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{currentData.content}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <p className="text-gray-600 font-poppins">Content not found</p>
                <p className="text-gray-500 text-sm mt-2 font-poppins">materialId: {materialId}, contentId: {contentId}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
