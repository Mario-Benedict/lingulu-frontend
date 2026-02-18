import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import startConvo from '@assets/dashboard/start-convo.svg';

const CharacterCard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg text-center flex flex-col items-center gap-4 sm:gap-6 h-full font-poppins">
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-100 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center mt-2 sm:mt-4">
        <img src={startConvo} alt="AI Tutor Character" className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 bg-gray-300 p-3 sm:p-4 mt-2 sm:mt-4 rounded-lg">
        {t('dashboard.practiceDescription')}
      </div>
      <button 
        onClick={() => navigate('/conversation')}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 sm:py-3 rounded-lg transition mt-auto shadow-lg text-sm sm:text-base"
      >
        {t('dashboard.startConversation')}
      </button>
    </div>
  );
};

export default CharacterCard;
