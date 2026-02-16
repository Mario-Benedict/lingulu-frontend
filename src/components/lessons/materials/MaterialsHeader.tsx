import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MaterialsHeaderProps {
  title: string;
  label?: string;
}

const MaterialsHeader: React.FC<MaterialsHeaderProps> = ({
  title,
  label = 'Material',
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 py-1 sm:py-2">
      <div className="flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 gap-3 sm:gap-6">
        <button
          onClick={() => navigate(-1)}
          className="group transition p-2 sm:p-3 md:p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary shrink-0"
        >
          <ArrowLeft
            className="text-white font-semibold group-hover:text-lessongray-800 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            size={28}
          />
        </button>
        <div className="text-lessongray-600 min-w-0">
          <p className="text-sm sm:text-base md:text-md text-lessongray-600 font-poppins">{label}</p>
          <h2 className="text-lg sm:text-3xl md:text-3xl font-bold text-primary font-rubik truncate">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default MaterialsHeader;
