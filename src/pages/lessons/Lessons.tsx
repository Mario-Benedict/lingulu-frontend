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
import { getCoursesProgress } from '@/api/services';
import type { CourseProgress } from '@/types';

type LevelType = {
  id: number;
  courseId: string;
  title: string;
  description: string;
  bgColor: string;
  isLocked: boolean;
  isComingSoon?: boolean;
  buttonText: string;
  buttonColor: string;
  lockMessage?: string;
  mascotImage: string;
  progress?: number;
};

const Lessons: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCoursesProgress();
        const data = res.data ?? [];
        
        const sortedCourses = data.sort((a, b) => {
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          const orderA = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 999;
          const orderB = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 999;
          return orderA - orderB;
        });
        
        setCourses(sortedCourses);
      } catch (err) {
        console.error('Fetch progress error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch courses');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const difficultyConfig = {
    'Beginner': {
      bgColor: 'bg-gradient-to-br from-lesson-lv1-from to-lesson-lv1-to',
      mascotImage: Beginner,
    },
    'Intermediate': {
      bgColor: 'bg-gradient-to-br from-lesson-lv2-from to-lesson-lv2-to',
      mascotImage: Intermediate,
    },
    'Advanced': {
      bgColor: 'bg-gradient-to-br from-lesson-lv3-from to-lesson-lv3-to',
      mascotImage: Advanced,
    },
  };

  const levels: Array<LevelType> = courses.map((course, index) => {
    const config = difficultyConfig[course.difficulty as keyof typeof difficultyConfig] || {
      bgColor: 'bg-gradient-to-br from-gray-400 to-gray-600',
      mascotImage: '',
    };

    const isLocked = index > 0 && course.status === 'NOT_STARTED';
    const isCompleted = course.status === 'COMPLETED';

    let buttonText = 'Start Learn';
    let buttonColor = 'bg-white text-gray-700 hover:bg-gray-100';
    
    if (isCompleted) {
      buttonText = 'Completed';
      buttonColor = 'bg-green-500 text-white';
    } else if (isLocked) {
      buttonText = 'Locked';
      buttonColor = 'bg-gray-300 text-gray-600';
    } else if (course.status === 'IN_PROGRESS') {
      buttonText = 'Continue';
    }

    return {
      id: index + 1,
      courseId: course.courseId,
      title: `Level ${index + 1}: ${course.difficulty}`,
      description: course.courseDescription,
      bgColor: isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600' : config.bgColor,
      isLocked,
      isComingSoon: false,
      buttonText,
      buttonColor,
      lockMessage: isLocked ? `Unlock by completing Level ${index}` : undefined,
      mascotImage: config.mascotImage,
      progress: isLocked ? undefined : course.progressPercentage,
    };
  });

  levels.push({
    id: courses.length + 1,
    courseId: '',
    title: '???',
    description: 'Something exciting is coming...',
    bgColor: 'bg-gradient-to-br from-gray-500 to-gray-700',
    isLocked: true,
    isComingSoon: true,
    buttonText: 'Coming Soon',
    buttonColor: 'bg-gray-300 text-gray-600',
    lockMessage: 'Coming Soon',
    mascotImage: '',
  });

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
                  onStart={level.isLocked || level.isComingSoon ? undefined : () => {
                    navigate(`/lessons/${level.courseId}/map`);
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