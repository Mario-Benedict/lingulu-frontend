import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SectionCardProps {
  id: number;
  title: string;
  description?: string;
  icon: LucideIcon;
  type: 'material' | 'exercise' | 'pronunciation';
}

const SectionCard: React.FC<SectionCardProps> = ({ id, title, description, icon, type }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (type === 'material') {
      navigate(`/lessons/materials/${id}`);
    } else if (type === 'exercise') {
      navigate(`/lessons/exercises/${id}`);
    } else if (type === 'pronunciation') {
      navigate(`/lessons/pronunciation/${id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="p-2 sm:p-3 shrink-0">
          {createElement(icon, {
            size: 36,
            className: 'text-primary sm:w-12 sm:h-12',
          })}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-lessongray-800 truncate">{title}</h3>
          {description && (
            <p className="text-xs sm:text-sm text-lessongray-500 mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleStart}
        className="w-full sm:w-auto bg-primary text-white px-6 sm:px-8 md:px-10 py-2 rounded-lg font-semibold hover:bg-primary-dark transition text-sm sm:text-base shrink-0"
      >
        Start
      </button>
    </div>
  );
};

export default SectionCard;
