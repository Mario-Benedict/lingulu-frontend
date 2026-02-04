import Sidebar from '@components/common/Sidebar';
import LearningProgressCard from '@components/dashboard/LearningProgressCard';
import StreakCard from '@components/dashboard/StreakCard';
import RankingCard from '@components/dashboard/RankingCard';
import CharacterCard from '@components/dashboard/CharacterCard';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar activeMenu="dashboard" />
      </div>
      <main className="flex-1 overflow-y-auto">
        {/* Header mirip Lessons */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 pt-[2.5rem]">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-7xl font-bold text-primary font-rubik">WELCOME BACK, Nicko!</h2>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Learning Progress Card */}
              <LearningProgressCard />

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StreakCard />
                <RankingCard />
              </div>
            </div>

            {/* Right Column - Character & CTA */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <CharacterCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;