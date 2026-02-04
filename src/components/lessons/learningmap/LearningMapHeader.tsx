import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LearningMapHeaderProps {
  title: string;
  subtitle: string;
}

const LearningMapHeader: React.FC<LearningMapHeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-fit bg-opacity-70 flex flex-1 gap-5 p-5 mt-5 ml-5 absolute z-10 rounded-lg">
      <button
        onClick={() => navigate('/lessons')}
        className="group transition p-4 hover:bg-gray-50 hover:shadow-orange-500 shadow-lg rounded-lg bg-orange-500"
      >
        <ArrowLeft
          className="text-white font-semibold group-hover:text-gray-800"
          size={28}
        />
      </button>
      <div className="flex flex-1 flex-col">
        <h2 className="text-gray-800 text-2xl font-semibold font-rubik">{title}</h2>
        <p className="text-gray-600 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default LearningMapHeader;
