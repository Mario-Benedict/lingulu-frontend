import React from 'react';
import { Flame, Zap } from 'lucide-react';
import StatItem from './StatItem';

interface UserStats {
  streak: number;
  xp: number;
  rank: number;
  completedLessons: number;
}

interface StatsCardProps {
  stats: UserStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-primary font-rubik mb-4">Your Stats</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Streak */}
        <StatItem
          icon={<Flame className="w-5 h-5 text-white" />}
          value={stats.streak}
          label="Streak"
          iconBgColor="bg-primary"
        />
        
        {/* XP */}
        <StatItem
          icon={<Zap className="w-5 h-5 text-white" />}
          value={stats.xp}
          label="XP"
          iconBgColor="bg-yellow-400"
        />
        
        {/* Rank */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center">
          <span className="text-gray-500 text-sm">Rank</span>
          <span className="text-2xl font-bold text-gray-800 font-rubik">{stats.rank}</span>
        </div>
        
        {/* Completed Lessons */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center">
          <span className="text-gray-500 text-sm">Completed Lessons</span>
          <span className="text-2xl font-bold text-gray-800 font-rubik">{stats.completedLessons}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
