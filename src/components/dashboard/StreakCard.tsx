import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  streak?: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak = 200 }) => {
  return (
    <div className="flex-1 bg-dashboard-streak rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 w-full max-h-[34vh]">
      <Flame size={48} />
      <div className="text-6xl font-bold font-rubik">{streak}</div>
      <span className="text-xl font-poppins">Burning Streak</span>
    </div>
  );
};

export default StreakCard;
