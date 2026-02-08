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
      <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5">
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => navigate(-1)}
            className="group transition p-2 sm:p-3 md:p-4 hover:bg-lessongray-50 hover:shadow-primary shadow-lg rounded-lg bg-primary shrink-0"
          >
            <ArrowLeft
              className="text-white font-semibold group-hover:text-lessongray-800 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
              size={28}
            />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-lessongray-800 font-rubik truncate">
              {title}
            </h2>
            <p className="text-lessongray-500 text-sm sm:text-base md:text-lg">
              {currentQuestion}/{totalQuestions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseHeader;
