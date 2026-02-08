import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Beginner from '@assets/lessons/beginner.svg';
import Intermediate from '@assets/lessons/intermediate.svg';
import Advanced from '@assets/lessons/advance.svg';
import PageLayout from '@components/common/PageLayout';
import LessonLevelCard from '@/components/lessons/lessons/LessonLevelCard';
import LoadingOverlay from '@components/lessons/lessons/LoadingOverlay';
import ErrorOverlay from '@components/lessons/lessons/ErrorOverlay';
import { api } from '@api/axios/instance';

const Lessons: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        const res = await api.get('/learning/progress/courses');
        console.log('Progress response:', res.data);
        const data = res.data ?? [];
        let level1 = 0, level2 = 0, level3 = 0;
        if (data.length > 0) {
          level1 = data[0]?.progressPercentage ?? 0;
          level2 = data[1]?.progressPercentage ?? 0;
          level3 = data[2]?.progressPercentage ?? 0;
        }
        setProgress({ level1, level2, level3 });
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
    <>
      {loading && <LoadingOverlay message="Loading progress..." />}
      {error && <ErrorOverlay message={error} />}
      <PageLayout activeMenu="lessons" title={t('lessons.title')}>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:gap-6 mx-auto">
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
                  onStart={level.isLocked ? undefined : () => navigate(`/lessons/map`)}
                />
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}


export default Lessons;