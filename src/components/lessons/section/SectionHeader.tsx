import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SectionHeaderProps {
  levelTitle: string;
  lessonTitle: string;
  backPath?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  levelTitle,
  lessonTitle,
  backPath = '/lessons/map',
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 py-2">
      <div className="flex items-center px-8 py-4 gap-6">
        <button
          onClick={() => navigate(backPath)}
          className="group transition p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary"
        >
          <ArrowLeft
            className="text-white font-semibold group-hover:text-lessongray-800"
            size={28}
          />
        </button>
        <div>
          <p className="text-lg text-lessongray-600">{levelTitle}</p>
          <h2 className="text-5xl font-bold text-primary font-rubik">{lessonTitle}</h2>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
