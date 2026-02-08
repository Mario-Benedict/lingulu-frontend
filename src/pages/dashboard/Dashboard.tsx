import React, { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Flame, Trophy } from 'lucide-react';
import startConvo from '@assets/dashboard/start-convo.svg';
import PageLayout from '@components/common/PageLayout';
import { getCurrentUserProfile, getDashboard, getUserRank, getAuthenticatedUser } from '@api/services/user';

interface DashboardData {
  username: string;
  streak: number;
  globalRank: number;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  progressPercentage: number;
}

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData>({
    username: localStorage.getItem('username') || 'User',
    streak: 200,
    globalRank: 0,
    currentLevel: 'Beginner',
    progressPercentage: 0
  });
  const [loading, setLoading] = useState(true);

  // Level color mapping - sama dengan Lessons
  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-gradient-to-br from-lesson-lv1-from to-lesson-lv1-to';
      case 'Intermediate':
        return 'bg-gradient-to-br from-lesson-lv2-from to-lesson-lv2-to';
      case 'Advanced':
        return 'bg-gradient-to-br from-lesson-lv3-from to-lesson-lv3-to';
      default:
        return 'bg-gradient-to-br from-lesson-lv1-from to-lesson-lv1-to';
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile data (includes username, streak)
        let userProfile = null;
        try {
          const profileResponse = await getCurrentUserProfile();
          userProfile = profileResponse.data;
          console.log('✅ Profile Response:', userProfile);
        } catch (profileErr) {
          console.error('❌ Failed to fetch profile:', profileErr);
          // Try to get username from localStorage as fallback
          const storedUsername = localStorage.getItem('username');
          if (storedUsername) {
            userProfile = { userName: storedUsername };
            console.log('📦 Using fallback username from localStorage:', storedUsername);
          }
        }

        // Fetch user rank separately
        let userRank = 0;
        try {
          const rankResponse = await getUserRank();
          userRank = rankResponse.data?.rank || 0;
          console.log('✅ User Rank Response:', rankResponse.data);
        } catch (rankErr) {
          console.error('❌ Failed to fetch rank:', rankErr);
        }

        // Fetch dashboard data for progress info
        let dashboardData = null;
        try {
          const dashboardResponse = await getDashboard();
          dashboardData = dashboardResponse.data;
          console.log('✅ Dashboard Response:', dashboardData);
        } catch (dashboardErr: any) {
          // 500 errors are expected if user hasn't started a course yet
          if (dashboardErr.response?.status === 500) {
            console.log('ℹ️ User has no active course progress (500 error expected)');
          } else {
            console.error('❌ Failed to fetch dashboard:', dashboardErr);
          }
        }

        // Map backend data to component state
        const progressPercentage = dashboardData?.courseResponse?.progressPercentage || 0;
        const currentLevel: 'Beginner' | 'Intermediate' | 'Advanced' = 
          progressPercentage >= 66 ? 'Advanced' : progressPercentage >= 33 ? 'Intermediate' : 'Beginner';

        // Determine username fallback chain
        const displayUsername = 
          userProfile?.userName || 
          dashboardData?.username || 
          localStorage.getItem('username') || 
          'User';

        console.log('📊 Final Data:', {
          username: displayUsername,
          streak: userProfile?.streak || dashboardData?.streak || 0,
          globalRank: userRank,
          currentLevel,
          progressPercentage
        });

        setData({
          username: displayUsername,
          streak: userProfile?.streak || dashboardData?.streak || 0,
          globalRank: userRank,
          currentLevel,
          progressPercentage
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleStartConversation = () => {
    navigate('/conversation');
  };

  const handleContinueLearning = () => {
    navigate('/lessons/map');
  };

  return (
    <PageLayout
      activeMenu="dashboard"
      title={t('dashboard.welcomeBack', { username: data.username })}
    >
      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            {/* Learning Progress Card - Dynamic color based on level */}
            <div className={`${getLevelStyle(data.currentLevel)} rounded-lg p-4 sm:p-6 text-white shadow-lg flex flex-col justify-between`}>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold opacity-90 mb-2 font-rubik">{t('dashboard.progress')}</div>
                <h3 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 font-poppins">
                  Level {data.currentLevel === 'Beginner' ? 1 : data.currentLevel === 'Intermediate' ? 2 : 3}: {t(`dashboard.${data.currentLevel.toLowerCase()}`)}
                </h3>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300" 
                    style={{ width: `${data.progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2 opacity-90">{Math.round(data.progressPercentage)}% Complete</p>
              </div>
              <button 
                onClick={handleContinueLearning}
                className="bg-white text-primary px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition self-end mt-4 sm:mt-6 font-rubik text-sm sm:text-base">
                {t('dashboard.continueLearning')}
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Card 1 - Streak */}
              <div className="bg-dashboard-streak rounded-lg p-4 sm:p-6 lg:p-8 text-white shadow-lg flex flex-col items-center justify-center gap-2 sm:gap-4">
                <Flame size={32} className="sm:w-12 sm:h-12" />
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold font-rubik">{data.streak}</div>
                <span className="text-sm sm:text-lg lg:text-xl font-poppins text-center">{t('dashboard.streak')}</span>
              </div>

              {/* Card 2 - Global Ranking */}
              <div className="bg-dashboard-gold rounded-lg p-4 sm:p-6 lg:p-8 text-white shadow-lg flex flex-col items-center justify-center gap-2 sm:gap-4">
                <Trophy size={32} className="sm:w-12 sm:h-12" />
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold font-rubik">{data.globalRank === 0 ? '-' : data.globalRank}</div>
                <span className="text-sm sm:text-lg lg:text-xl font-poppins text-center">{t('dashboard.globalRank')}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Character & CTA */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-1">
            {/* Character Card */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg text-center flex flex-col items-center gap-4 sm:gap-6 h-full font-poppins">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gray-100 rounded-full mx-auto flex items-center justify-center mt-2 sm:mt-4">
                <img src={startConvo} alt="" className='w-full h-full object-cover rounded-full'/>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 bg-gray-300 p-3 sm:p-4 mt-2 sm:mt-4 rounded-lg">{t('dashboard.practiceDescription')}</div>
              <button 
                onClick={handleStartConversation}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition mt-auto shadow-lg text-sm sm:text-base"
              >
                {t('dashboard.startConversation')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;