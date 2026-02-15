import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy } from 'lucide-react';
import startConvo from '@assets/dashboard/start-convo.svg';
import Sidebar from '@components/common/Sidebar';
import { getDashboard } from '@api/services/user';

interface DashboardData {
  username: string;
  streak: number;
  globalRank: number;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  progressPercentage: number;
  courseId?: string;
}

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData>({
    username: 'User',
    streak: 0,
    globalRank: 0,
    currentLevel: 'Beginner',
    progressPercentage: 0,
    courseId: ''
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
        
        // Fetch all data from dashboard endpoint
        const dashboardRes = await getDashboard();
        console.log('📊 Raw Dashboard Response:', dashboardRes);
        const dashboardData = dashboardRes.data?.data || dashboardRes.data;
        console.log('✅ Dashboard Response:', dashboardData);

        const {
          username = 'User',
          streak = 0,
          rank = 0,
          courseResponse = null
        } = dashboardData;

        // Extract course progress data
        let currentLevel: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
        let progressPercentage = 0;
        let courseId = '';

        if (courseResponse) {
          const { courseTitle = '', progressPercentage: progress = 0, courseId: cId = '' } = courseResponse;
          progressPercentage = progress;
          courseId = cId;

          // Determine level based on course title
          const titleLower = courseTitle.toLowerCase();
          if (titleLower.includes('advanced')) {
            currentLevel = 'Advanced';
          } else if (titleLower.includes('intermediate')) {
            currentLevel = 'Intermediate';
          } else {
            currentLevel = 'Beginner';
          }
        }

        console.log('📊 Final Dashboard Data:', {
          username,
          streak,
          globalRank: rank,
          currentLevel,
          progressPercentage,
          courseId
        });

        setData({
          username,
          streak,
          globalRank: rank,
          currentLevel,
          progressPercentage,
          courseId
        });
      } catch (err) {
        
        console.error('❌ Failed to fetch dashboard:', err);
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
    if (data.courseId) {
      navigate(`/lessons/map?courseId=${data.courseId}`);
    }
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