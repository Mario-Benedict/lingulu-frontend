import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SectionCardProps {
  id: number;
  sectionId?: string;
  materialId?: string;
  exerciseId?: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  type: 'material' | 'exercise' | 'pronunciation';
}


const SectionCard: React.FC<SectionCardProps & { status?: string }> = ({ id, sectionId, materialId, exerciseId, title, description, icon, type, status }) => {
  const navigate = useNavigate();
  const isCompleted = status === 'COMPLETED';

  const handleStart = () => {
    if (type === 'material') {
      navigate(`/lessons/materials/${materialId || id}`);
    } else if (type === 'exercise') {
      navigate(`/lessons/exercises/${sectionId || id}`);
    } else if (type === 'pronunciation') {
      navigate(`/lessons/pronunciation/${exerciseId || id}`);
    }
  };

  return (
    <div className={`rounded-lg p-4 sm:p-5 md:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg transition-shadow border-2 ${isCompleted ? 'border-green-400 bg-green-50/60' : 'bg-white border-transparent'}`}>
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="p-2 sm:p-3 shrink-0 relative">
          {createElement(icon, {
            size: 36,
            className: isCompleted ? 'text-green-500 sm:w-12 sm:h-12' : 'text-primary sm:w-12 sm:h-12',
          })}
          {isCompleted && (
            <span className="absolute -top-1 -right-1 bg-green-400 rounded-full p-1 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold truncate ${isCompleted ? 'text-green-700' : 'text-lessongray-800'}`}>{title}</h3>
              {description && (
                <p className={`text-xs sm:text-sm mt-1 line-clamp-2 ${isCompleted ? 'text-green-600' : 'text-lessongray-500'}`}>{description}</p>
              )}
        </div>
      </div>
      <button
        onClick={handleStart}
        className={`w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2 rounded-lg font-semibold transition text-sm sm:text-base shrink-0 ${isCompleted ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-primary text-white hover:bg-primary-dark'}`}
      >
        {isCompleted ? 'Selesai' : 'Start'}
      </button>
    </div>
  );
};

export default SectionCard;
