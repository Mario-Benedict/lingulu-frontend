import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Beginner from '@assets/lessons/beginner.svg';
import Intermediate from '@assets/lessons/intermediate.svg';
import Advanced from '@assets/lessons/advance.svg';
import Sidebar from '@components/common/Sidebar';
import LessonLevelCard from '@/components/lessons/lessons/LessonLevelCard';
import LessonsHeader from '@components/lessons/lessons/LessonsHeader';
import LoadingOverlay from '@components/lessons/lessons/LoadingOverlay';
import ErrorOverlay from '@components/lessons/lessons/ErrorOverlay';
import { api } from '@api/axios/instance';

const Lessons: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<{ level1: number; level2: number; level3: number }>({
    level1: 0,
    level2: 0,
    level3: 0,
  });
  const [courseIds, setCourseIds] = useState<{ beginner?: string; intermediate?: string; advanced?: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/learning/progress/courses');
        console.log('Progress response:', res.data);
        const data = res.data ?? [];
        let level1 = 0, level2 = 0, level3 = 0;
        
        // Parse courseTitle to determine level since backend order is inconsistent
        const ids: { beginner?: string; intermediate?: string; advanced?: string } = {};
        data.forEach((course: any) => {
          const title = course?.courseTitle?.toLowerCase() || '';
          const progress = course?.progressPercentage ?? 0;
          const courseId = course?.courseId;
          
          if (title.includes('beginner')) {
            level1 = progress;
            ids.beginner = courseId;
          } else if (title.includes('intermediate')) {
            level2 = progress;
            ids.intermediate = courseId;
          } else if (title.includes('advanced')) {
            level3 = progress;
            ids.advanced = courseId;
          }
        });
        
        setProgress({ level1, level2, level3 });
        setCourseIds(ids);
      } catch (err) {
        console.error('Fetch progress error:', err);
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
    {
      id: 4,
      title: 'Level 4: Expert',
      description: 'Professional fluency. Business & academic topics.',
      bgColor: 'bg-gradient-to-br from-gray-500 to-gray-700',
      isLocked: true,
      isComingSoon: true,
      buttonText: 'Coming Soon',
      buttonColor: 'bg-gray-300 text-gray-600',
      lockMessage: 'Coming Soon',
      mascotImage: '',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      {loading && <LoadingOverlay message="Loading progress..." />}
      {error && <ErrorOverlay message={error} />}
      <Sidebar activeMenu="lessons" />
      <div className="flex-1 flex flex-col min-w-0">
        <LessonsHeader title="Start Your Journey" />
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
                  isComingSoon={level.isComingSoon}
                  buttonText={level.buttonText}
                  buttonColor={level.buttonColor}
                  lockMessage={level.lockMessage}
                  mascotImage={level.mascotImage}
                  progress={level.progress}
                  onStart={level.isLocked ? undefined : () => {
                    const courseId = level.id === 1 ? courseIds.beginner : level.id === 2 ? courseIds.intermediate : courseIds.advanced;
                    navigate(`/lessons/map?courseId=${courseId}`);
                  }}
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