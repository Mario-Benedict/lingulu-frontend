import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import type { LessonStatus } from '@/types/general';

interface SectionCardProps {
  sectionId: string;
  title: string;
  description: string;
  icon: LucideIcon;
  type: 'material' | 'exercise' | 'pronunciation';
  status: LessonStatus;
}

const SectionCard: React.FC<SectionCardProps> = ({ sectionId, title, description, icon, type, status }) => {
  const navigate = useNavigate();
  const isCompleted = status === 'COMPLETED';

  const handleStart = () => {
    if (type === 'material') {
      navigate(`/lessons/materials/${sectionId}`);
    } else if (type === 'exercise') {
      navigate(`/lessons/exercises/${sectionId}`);
    } else if (type === 'pronunciation') {
      navigate(`/lessons/pronunciation/${sectionId}`);
    }
  };

  const getStatusStyles = () => {
    if (status === 'COMPLETED') {
      return 'bg-green-50 border-2 border-green-500';
    }
    return 'bg-white';
  };

  const getButtonStyles = () => {
    if (status === 'COMPLETED') {
      return 'bg-green-600 hover:bg-green-700';
    }
    return 'bg-primary hover:bg-primary-dark';
  };

  const getButtonText = () => {
    if (status === 'COMPLETED') return 'Review';
    if (status === 'IN_PROGRESS') return 'Continue';
    return 'Start';
  };

  return (
    <div className={`rounded-lg p-4 sm:p-5 md:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg transition-shadow ${getStatusStyles()}`}>
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="p-2 sm:p-3 shrink-0 relative">
          {createElement(icon, {
            size: 36,
            className: `${status === 'COMPLETED' ? 'text-green-600' : 'text-primary'} sm:w-12 sm:h-12`,
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
        className={`w-full sm:w-auto text-white px-6 sm:px-8 md:px-10 py-2 rounded-lg font-semibold transition text-sm sm:text-base shrink-0 ${getButtonStyles()}`}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default SectionCard;
