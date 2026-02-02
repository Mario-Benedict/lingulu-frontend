import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Beginner from '@assets/lessons/beginner.svg';
import Intermediate from '@assets/lessons/intermediate.svg';
import Advanced from '@assets/lessons/advance.svg';
import Sidebar from '@components/common/Sidebar';
import LessonLevelCard from '@components/lessons/LessonLevelCard';


const Lessons: React.FC = () => {
  const navigate = useNavigate();
  // const [activeMenu, setActiveMenu] = React.useState('lessons');
  const [progress, setProgress] = useState<{ level1: number; level2: number; level3: number }>({
    level1: 0,
    level2: 0,
    level3: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
        const token = localStorage.getItem('token');
        const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch(`${API_BASE}/api/learning/complete`, { headers });
        const payload = await res.json();
        if (!payload?.success) {
          throw new Error(payload?.message ?? 'Failed to fetch progress');
        }
        // Mapping: cari courseId/sectionId yang sesuai untuk Beginner, Intermediate, Advanced
        // Sementara: ambil 3 course pertama dari object (atau mapping manual jika sudah tahu id)
        const data = payload.data;
        const courseIds = Object.keys(data ?? {});
        let level1 = 0, level2 = 0, level3 = 0;
        if (courseIds.length > 0) {
          // Mapping default: urutkan berdasarkan index
          level1 = data[courseIds[0]]?.progressPercentage ?? 0;
          level2 = data[courseIds[1]]?.progressPercentage ?? 0;
          level3 = data[courseIds[2]]?.progressPercentage ?? 0;
        }
        setProgress({ level1, level2, level3 });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Gagal fetch progress');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  // const menuItems = [
  //   { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  //   { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
  //   { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, path: '/leaderboard' },
  //   { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, path: '/conversation' },
  //   { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  // ];

  // Example logic: unlock next level if previous is completed
  // You can adjust this logic based on your backend's lesson structure
  // Logic lock/unlock dan progress per level
  const levels = [
    {
      id: 1,
      title: 'Level 1: Beginner',
      description: 'Start your journey! Basic words & phrases.',
      bgColor: 'bg-gradient-to-br from-lesson-lv1-from to-lesson-lv1-to',
      isLocked: false,
      buttonText: 'Start Learn',
      buttonColor: 'bg-white text-gray-700 hover:bg-gray-100',
      mascotImage: Beginner,
      progress: progress.level1,
    },
    {
      id: 2,
      title: 'Level 2: Intermediate',
      description: 'Conversational skills. Speak with confidence.',
      bgColor: 'bg-gradient-to-br from-lesson-lv2-from to-lesson-lv2-to',
      isLocked: progress.level1 < 100,
      buttonText: progress.level1 < 100 ? 'Locked' : 'Start Learn',
      buttonColor: progress.level1 < 100 ? 'bg-gray-300 text-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100',
      lockMessage: 'Unlock by completing Level 1',
      mascotImage: Intermediate,
      progress: progress.level1 >= 100 ? progress.level2 : undefined,
    },
    {
      id: 3,
      title: 'Level 3: Advanced',
      description: 'Mastery & fluency. Complex topics.',
      bgColor: 'bg-gradient-to-br from-lesson-lv3-from to-lesson-lv3-to',
      isLocked: progress.level1 < 100 || progress.level2 < 100,
      buttonText: (progress.level1 < 100 || progress.level2 < 100) ? 'Locked' : 'Start Learn',
      buttonColor: (progress.level1 < 100 || progress.level2 < 100) ? 'bg-gray-300 text-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100',
      lockMessage: 'Unlock by completing Level 2',
      mascotImage: Advanced,
      progress: (progress.level1 >= 100 && progress.level2 >= 100) ? progress.level3 : undefined,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
          <span className="text-2xl text-primary font-bold">Loading progress...</span>
        </div>
      )}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <span className="text-xl text-red-500 font-bold">{error}</span>
        </div>
      )}
      <Sidebar activeMenu="lessons" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 pt-[2.5rem]">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-7xl font-bold text-primary font-rubik">Start Your Journey</h2>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex flex-col gap-6 mx-auto">
              {levels.map((level) => (
                <LessonLevelCard
                  key={level.id}
                  id={level.id}
                  title={level.title}
                  description={level.description}
                  bgColor={level.bgColor}
                  isLocked={level.isLocked}
                  buttonText={level.buttonText}
                  buttonColor={level.buttonColor}
                  lockMessage={level.lockMessage}
                  mascotImage={level.mascotImage}
                  progress={level.progress}
                  onStart={level.isLocked ? undefined : () => navigate(`/lessons/map`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Lessons;