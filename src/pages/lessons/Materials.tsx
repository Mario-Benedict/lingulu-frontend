import React from 'react';
import { Home, BookOpen, BotMessageSquare, User, ChartColumn, ArrowLeft} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

export default function Materials() {
  const navigate = useNavigate();
  const { materialId } = useParams();
  const [activeMenu, setActiveMenu] = React.useState('lessons');
  
  // Determine content type and ID from route
  const contentId = materialId;
  const contentType = 'material';


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
    <div className="flex h-screen bg-lessongray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 font-poppins">

        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 py-2">
          <div className="flex items-center px-8 py-4 gap-6">
            <button onClick={() => navigate(-1)} className='group transition p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary'><ArrowLeft className="text-white font-semibold group-hover:text-lessongray-800" size={28}/></button>
            <div className="text-lessongray-600">
              <p className="text-lg text-lessongray-600 font-poppins">Material</p>
              <h2 className="text-5xl font-bold text-primary font-rubik">{currentData?.title || 'Loading...'}</h2>
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
                  <h1 className="text-3xl font-bold text-lessongray-800 mb-4">{currentData.title}</h1>
                  <p className="text-lessongray-600 leading-relaxed whitespace-pre-wrap">{currentData.content}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <p className="text-lessongray-600 font-poppins">Content not found</p>
                <p className="text-lessongray-500 text-sm mt-2 font-poppins">materialId: {materialId}, contentId: {contentId}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
