import { useParams } from 'react-router-dom';
import Sidebar from '@components/common/Sidebar';
import MaterialsHeader from '@components/lessons/materials/MaterialsHeader';
import { MaterialContent, MaterialNotFound } from '@components/lessons/materials/MaterialContent';

const Materials: React.FC = () => {
  const { materialId } = useParams();
  const contentId = materialId;
  const contentType = 'material';

  const materialsData: Record<string, { id: number; title: string; content: string; levelId: number; order: number }> = {
    '1': { id: 1, title: 'Pengenalan Bahasa', content: 'Materi tentang pengenalan bahasa...', levelId: 1, order: 1 },
    '2': { id: 2, title: 'Tata Bahasa Dasar', content: 'Materi tentang tata bahasa dasar...', levelId: 1, order: 2 },
  };

  const currentData =
    contentType === 'material' && contentId && contentId in materialsData ? materialsData[contentId] : null;

  return (
    <div className="flex h-screen bg-lessongray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        <MaterialsHeader title={currentData?.title || 'Loading...'} />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {currentData ? (
              <MaterialContent title={currentData.title} content={currentData.content} />
            ) : (
              <MaterialNotFound materialId={materialId} contentId={contentId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
