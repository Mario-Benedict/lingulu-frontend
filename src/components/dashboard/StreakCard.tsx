import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  streak?: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak = 200 }) => {
  const {t} = useTranslation();
  return (
    <div className="flex-1 bg-dashboard-streak rounded-lg p-4 sm:p-6 md:p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-2 sm:gap-4 w-full max-h-[34vh]">
      <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
      <div className="text-3xl sm:text-4xl md:text-6xl font-bold font-rubik">{streak}</div>
      <span className="text-sm sm:text-lg md:text-xl font-poppins">{t('dashboard.streak')}</span>
    </div>
  );
};

export default StreakCard;
