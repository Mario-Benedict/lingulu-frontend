import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from '@components/common/PageLayout';
import MaterialsHeader from '@components/lessons/materials/MaterialsHeader';
import { MaterialContent, MaterialNotFound } from '@components/lessons/materials/MaterialContent';
import { getMaterialContent, markMaterialAsCompleted } from '@api/services';
import type { Material } from '@/types';
import { Check } from 'lucide-react';

const Materials: React.FC = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMarking, setIsMarking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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
        const response = await getMaterialContent(materialId);
        setCurrentData(response.data || null);
        setIsCompleted(response.data?.isCompleted || false);
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

  const handleMarkAsDone = async () => {
    if (!materialId || isCompleted) return;

    try {
      setIsMarking(true);
      await markMaterialAsCompleted(materialId);
      
      setIsCompleted(true);
      
      // Show success feedback then navigate back
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      console.error('Error marking material as done:', err);
      alert('Failed to mark material as completed. Please try again.');
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        <MaterialsHeader title={currentData?.sectionTitle || 'Loading...'} />
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
              <>
                <MaterialContent content={currentData.grammar || currentData.vocabularies || null} type={currentData.sectionType} />
                
                {/* Mark as Done Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleMarkAsDone}
                    disabled={isMarking || isCompleted}
                    className={`
                      px-8 py-3 rounded-lg font-semibold font-poppins
                      flex items-center gap-2 transition-all
                      ${isCompleted 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-primary text-white hover:bg-primary-dark active:scale-95'
                      }
                      ${isMarking ? 'opacity-50 cursor-not-allowed' : ''}
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {isMarking ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Marking...</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <Check size={20} />
                        <span>Completed!</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        <span>Mark as Done</span>
                      </>
                    )}
                  </button>
                </div>
              </>
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
