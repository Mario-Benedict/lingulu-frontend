import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LearningMapHeaderProps {
  title: string;
  subtitle: string;
}

const LearningMapHeader: React.FC<LearningMapHeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-fit bg-opacity-70 flex flex-1 gap-3 sm:gap-5 p-3 sm:p-5 mt-3 sm:mt-5 ml-3 sm:ml-5 absolute z-10 rounded-lg max-w-[calc(100%-1.5rem)] sm:max-w-none">
      <button
        onClick={() => navigate('/lessons')}
        className="group transition p-2 sm:p-4 hover:bg-gray-50 hover:shadow-orange-500 shadow-lg rounded-lg bg-orange-500 shrink-0"
      >
        <ArrowLeft
          className="text-white font-semibold group-hover:text-gray-800 w-5 h-5 sm:w-7 sm:h-7"
          size={28}
        />
      </button>
      <div className="flex flex-1 flex-col min-w-0">
        <h2 className="text-gray-800 text-lg sm:text-2xl font-semibold font-rubik truncate">{title}</h2>
        <p className="text-gray-600 text-sm sm:text-lg truncate">{subtitle}</p>
      </div>
    </div>
  );
};

export default LearningMapHeader;
