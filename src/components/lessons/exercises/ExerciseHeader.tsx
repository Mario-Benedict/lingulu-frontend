import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExerciseHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  title,
  currentQuestion,
  totalQuestions,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2">
      <div className="px-8 py-5">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="group transition p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary"
          >
            <ArrowLeft
              className="text-white font-semibold group-hover:text-lessongray-800"
              size={28}
            />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-lessongray-800 font-rubik">
              {title}
            </h2>
            <p className="text-lessongray-500 text-lg">
              {currentQuestion}/{totalQuestions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseHeader;
