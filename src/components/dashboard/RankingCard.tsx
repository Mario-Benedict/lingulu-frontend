import React from 'react';
import { Trophy } from 'lucide-react';

interface RankingCardProps {
  rank?: number;
}

const RankingCard: React.FC<RankingCardProps> = ({ rank = 5 }) => {
  return (
    <div className="flex-1 bg-dashboard-gold rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 max-h-[34vh] w-full">
      <Trophy size={48} />
      <div className="text-6xl font-bold font-rubik">{rank}</div>
      <span className="text-xl font-poppins">Global Rank</span>
    </div>
  );
};

export default RankingCard;
