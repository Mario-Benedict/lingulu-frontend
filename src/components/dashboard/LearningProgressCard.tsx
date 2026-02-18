import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-lesson-lv1-from to-lesson-lv1-to rounded-lg p-4 sm:p-5 md:p-6 text-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="text-xl sm:text-2xl md:text-3xl font-semibold opacity-90 mb-1 sm:mb-2 font-rubik">{t('dashboard.progress')}</div>
        <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 font-poppins">{level}</h3>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5 sm:h-2">
          <div className="bg-white rounded-full h-1.5 sm:h-2" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button 
        onClick={() => navigate('/lessons/map')}
        className="bg-white text-primary px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-gray-100 transition self-end mt-4 sm:mt-6 font-rubik text-sm sm:text-base"
      >
        {t('dashboard.continue')}
      </button>
    </div>
  );
};

export default LearningProgressCard;
