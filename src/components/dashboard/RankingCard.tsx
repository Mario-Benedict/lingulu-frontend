import React from 'react';
import { Trophy } from 'lucide-react';

interface RankingCardProps {
  rank?: number;
}

const RankingCard: React.FC<RankingCardProps> = ({ rank = 5 }) => {
  return (
    <div className="flex-1 bg-dashboard-gold rounded-lg p-4 sm:p-6 md:p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-2 sm:gap-4 max-h-[34vh] w-full">
      <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
      <div className="text-3xl sm:text-4xl md:text-6xl font-bold font-rubik">{rank}</div>
      <span className="text-sm sm:text-lg md:text-xl font-poppins">Global Rank</span>
    </div>
  );
};

export default RankingCard;
