import React, { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy } from 'lucide-react';
import startConvo from '@assets/dashboard/start-convo.svg';
import Sidebar from '@components/common/Sidebar';
import { getCurrentUserProfile, getDashboard, getUserRank, getAuthenticatedUser, getLeaderboard } from '@api/services/user';
import { api } from '@api/axios/instance';

interface DashboardData {
  username: string;
  streak: number;
  globalRank: number;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  progressPercentage: number;
}

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData>({
    username: localStorage.getItem('username') || 'User',
    streak: 200,
    globalRank: 0,
    currentLevel: 'Beginner',
    progressPercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [courseIds, setCourseIds] = useState<{ beginner?: string; intermediate?: string; advanced?: string }>({});

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

        // Fetch user rank dari leaderboard (sudah sorted dengan tie-breaker based on waktu)
        let userRank = 0;
        try {
          const leaderboardResponse = await getLeaderboard();
          
          if (leaderboardResponse && userProfile) {
            const rawData = leaderboardResponse.data?.data || leaderboardResponse.data;
            const leaderboardData = Array.isArray(rawData) ? rawData : [];
            
            // Find current user's position in leaderboard (already sorted by backend with tie-breaker)
            const currentUsername = userProfile.userName?.toLowerCase().trim();
            const foundIdx = leaderboardData.findIndex((item: any) => 
              (item.username || item.name || '').toLowerCase().trim() === currentUsername
            );
            
            if (foundIdx !== -1) {
              userRank = foundIdx + 1;
            }
            console.log('✅ User Rank from Leaderboard:', userRank);
          }
        } catch (rankErr) {
          console.error('❌ Failed to fetch rank from leaderboard:', rankErr);
        }

        // Fetch progress from /learning/progress/courses (same endpoint as Lessons)
        let progressPercentage = 0;
        let currentLevel: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
        let beginnerProgress = 0, intermediateProgress = 0, advancedProgress = 0;
        
        try {
          const res = await api.get('/learning/progress/courses');
          const data = res.data ?? [];
          console.log('✅ Progress Courses:', data);
          
          // Parse courseTitle to determine level since backend order is inconsistent
          const ids: { beginner?: string; intermediate?: string; advanced?: string } = {};
          data.forEach((course: any) => {
            const title = course?.courseTitle?.toLowerCase() || '';
            const progress = course?.progressPercentage ?? 0;
            const courseId = course?.courseId;
            
            if (title.includes('beginner')) {
              beginnerProgress = progress;
              ids.beginner = courseId;
            } else if (title.includes('intermediate')) {
              intermediateProgress = progress;
              ids.intermediate = courseId;
            } else if (title.includes('advanced')) {
              advancedProgress = progress;
              ids.advanced = courseId;
            }
          });
          
          setCourseIds(ids);
          
          // Determine level based on completion
          if (beginnerProgress === 100 && intermediateProgress === 100) {
            currentLevel = 'Advanced';
            progressPercentage = advancedProgress;
          } else if (beginnerProgress === 100) {
            currentLevel = 'Intermediate';
            progressPercentage = intermediateProgress;
          } else {
            currentLevel = 'Beginner';
            progressPercentage = beginnerProgress;
          }
          
          console.log('✅ Current Level:', currentLevel, 'Progress:', progressPercentage);
        } catch (err) {
          console.error('❌ Failed to fetch progress:', err);
        }

        // Determine username fallback chain
        const displayUsername = 
          userProfile?.userName || 
          localStorage.getItem('username') || 
          'User';

        console.log('📊 Final Data:', {
          username: displayUsername,
          streak: userProfile?.streak || 0,
          globalRank: userRank,
          currentLevel,
          progressPercentage
        });

        setData({
          username: displayUsername,
          streak: userProfile?.streak || 0,
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
    let targetCourseId = courseIds.beginner;
    
    if (data.currentLevel === 'Intermediate') {
      targetCourseId = courseIds.intermediate;
    } else if (data.currentLevel === 'Advanced') {
      targetCourseId = courseIds.advanced;
    }
    
    navigate(`/lessons/map?courseId=${targetCourseId}`);
  };

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
            <h2 className="text-7xl font-bold text-primary font-rubik">WELCOME BACK, {data.username}!</h2>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Learning Progress Card - Dynamic color based on level */}
              <div className={`${getLevelStyle(data.currentLevel)} rounded-lg p-6 text-white shadow-lg flex flex-col justify-between`}>
                <div>
                  <div className="text-3xl font-semibold opacity-90 mb-2 font-rubik">Learning Progress</div>
                  <h3 className="text-6xl font-bold mb-4 font-poppins">Level {data.currentLevel === 'Beginner' ? 1 : data.currentLevel === 'Intermediate' ? 2 : 3}: {data.currentLevel}</h3>
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
                  className="bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition self-end mt-6 font-rubik">
                  Continue
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Card 1 - Streak */}
                <div className="flex-1 bg-dashboard-streak rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 w-full max-h-[34vh]">
                  <Flame size={48}></Flame>
                  <div className="text-6xl font-bold font-rubik">{data.streak}</div>
                  <span className="text-xl font-poppins">Burning Streak</span>
                </div>

                {/* Card 2 - Global Ranking */}
                <div className="flex-1 bg-dashboard-gold rounded-lg p-8 text-white shadow-lg aspect-square flex flex-col items-center justify-center gap-4 max-h-[34vh] w-full">
                  <Trophy size={48}></Trophy>
                  <div className="text-6xl font-bold font-rubik">{data.globalRank === 0 ? '-' : data.globalRank}</div>
                  <span className="text-xl font-poppins">Global Rank</span>
                </div>
              </div>
            </div>

            {/* Right Column - Character & CTA */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              {/* Character Card */}
              <div className="bg-white rounded-lg p-6 shadow-lg text-center flex flex-col items-center gap-6 h-full font-poppins">
                <div className="w-48 h-48 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center mt-4">
                  <img src={startConvo} alt="" className='w-full h-full object-cover rounded-full'/>
                </div>
                <div className="text-2xl font-semibold text-gray-700 bg-gray-300 p-4 mt-4 rounded-lg">Ready to practice? <br /> Let's talk!</div>
                <button 
                  onClick={handleStartConversation}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition mt-auto shadow-lg"
                >
                  Start Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;