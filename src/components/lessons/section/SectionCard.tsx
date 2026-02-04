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
    <div className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3">
          {createElement(icon, {
            size: 48,
            className: 'text-primary',
          })}
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-lessongray-800">{title}</h3>
          {description && (
            <p className="text-sm text-lessongray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleStart}
        className="bg-primary text-white px-10 py-2 rounded-lg font-semibold hover:bg-primary-dark transition"
      >
        Start
      </button>
    </div>
  );
};

export default SectionCard;
