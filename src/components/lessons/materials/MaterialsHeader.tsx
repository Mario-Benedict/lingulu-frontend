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
    <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 py-2">
      <div className="flex items-center px-8 py-4 gap-6">
        <button
          onClick={() => navigate(-1)}
          className="group transition p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary"
        >
          <ArrowLeft
            className="text-white font-semibold group-hover:text-lessongray-800"
            size={28}
          />
        </button>
        <div className="text-lessongray-600">
          <p className="text-lg text-lessongray-600 font-poppins">{label}</p>
          <h2 className="text-5xl font-bold text-primary font-rubik">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default MaterialsHeader;
