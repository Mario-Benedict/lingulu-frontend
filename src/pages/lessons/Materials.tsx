import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from '@components/common/PageLayout';
import MaterialsHeader from '@components/lessons/materials/MaterialsHeader';
import { MaterialContent, MaterialNotFound } from '@components/lessons/materials/MaterialContent';
import { fetchMaterialContent } from '@api/services/materials';

interface Material {
  id: number;
  title: string;
  content: string;
  levelId: number;
  order: number;
}

const Materials: React.FC = () => {
  const { materialId } = useParams();
  const [currentData, setCurrentData] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMaterial = async () => {
      if (!materialId) {
        setError('Material ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchMaterialContent(materialId);
        setCurrentData(data);
      } catch (err: any) {
        console.error('Error loading material:', err);
        setError(err.message || 'Failed to load material');
        setCurrentData(null);
      } finally {
        setLoading(false);
      }
    };

    loadMaterial();
  }, [materialId]);

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        <MaterialsHeader title={currentData?.title || 'Loading...'} />
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            {loading && (
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <p className="text-lessongray-600 font-poppins">Loading material...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 rounded-lg p-8 shadow-md text-center border border-red-200">
                <p className="text-red-600 font-poppins font-semibold mb-2">Error</p>
                <p className="text-red-500 text-sm font-poppins">{error}</p>
              </div>
            )}

            {!loading && !error && currentData ? (
              <MaterialContent title={currentData.title} content={currentData.content} />
            ) : !loading && !error ? (
              <MaterialNotFound materialId={materialId} />
            ) : null}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Materials;
