import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import leaderboardDummy from '@assets/landing/leaderboard-dummy.png';
import mascotLeaderboard from '@assets/landing/mascot-leaderboard.svg';

const LeaderboardSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16">
        {/* Left - Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary font-rubik mb-4">
            Pantau kemajuan mu<br />
            & jadi yang terbaik
          </h2>
          <p className="text-gray-600 font-poppins mb-8">
            Bergabunglah dengan komunitas global<br />
            dan rebut posisi peringkat global di leaderboard!
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 w-full h-full">
            {/* Card 1 - Streak */}
            <div className="bg-dashboard-streak rounded-lg p-6 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 h-full">
              <Flame size={64} />
              <div className="text-3xl font-bold font-rubik">200</div>
            </div>

            {/* Card 2 - Global Ranking */}
            <div className="bg-dashboard-gold rounded-lg p-6 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 w-46 h-full">
              <Trophy size={64} />
              <div className="text-3xl font-bold font-rubik">5</div>
            </div>
          </div>
        </div>

        {/* Right - Leaderboard Preview with Mascot */}
        <div className="flex-1 relative flex justify-center">
          <div className="relative">
            {/* Leaderboard Image */}
            <img 
              src={leaderboardDummy} 
              alt="Leaderboard" 
              className="w-full max-w-md"
            />
            {/* Mascot */}
            <img 
              src={mascotLeaderboard} 
              alt="Mascot" 
              className="absolute -right-8 lg:-right-16 -bottom-10 w-32 lg:w-48"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
