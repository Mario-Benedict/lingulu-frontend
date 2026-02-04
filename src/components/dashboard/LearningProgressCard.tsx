import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LearningProgressCardProps {
  level?: string;
  progress?: number;
}

const LearningProgressCard: React.FC<LearningProgressCardProps> = ({ 
  level = 'Level 1: Beginner', 
  progress = 45 
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-lesson-lv1-from to-lesson-lv1-to rounded-lg p-6 text-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="text-3xl font-semibold opacity-90 mb-2 font-rubik">Learning Progress</div>
        <h3 className="text-6xl font-bold mb-4 font-poppins">{level}</h3>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
          <div className="bg-white rounded-full h-2" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button 
        onClick={() => navigate('/lessons/map')}
        className="bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition self-end mt-6 font-rubik"
      >
        Continue
      </button>
    </div>
  );
};

export default LearningProgressCard;
