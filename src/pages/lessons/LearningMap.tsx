import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import learningMapBg from '@assets/lessons/learning-map-new.png';
import PageLayout from '@components/common/PageLayout';
import LearningMapHeader from '@components/lessons/learningmap/LearningMapHeader';
import LessonsList from '@components/lessons/learningmap/LessonsList';
import type { LessonProgress } from '@/types/progress';
import { getCourseProgressDetail, getLessonsProgress } from '@/api/services';

const LearningMap: React.FC = () => {
  const { courseId } = useParams();
  
  const [lessons, setLessons] = useState<LessonProgress[]>([]);
  const [courseTitle, setCourseTitle] = useState('Learning Course');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const courseDetailRes = await getCourseProgressDetail({ courseId });
        
        if (courseDetailRes.data) {
          setCourseTitle(courseDetailRes.data.courseTitle || 'Learning Course');
        }
        
        const progressRes = await getLessonsProgress({ courseId });
        const progressData = progressRes.data ?? [];
        
        setLessons(progressData);
      } catch {
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const getLevel = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('beginner')) return 'Beginner';
    if (titleLower.includes('intermediate')) return 'Intermediate';
    if (titleLower.includes('advanced')) return 'Advanced';
    return 'Beginner';
  };

  const subtitle = `${lessons.length} Lessons - ${getLevel(courseTitle)}`;

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0 font-poppins h-full">
        <div className="flex-1 overflow-hidden relative">
          <div
            className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
            style={{ backgroundImage: `url(${learningMapBg})` }}
          />
          <LearningMapHeader
            title={courseTitle}
            subtitle={subtitle}
          />
          {loading && lessons.length === 0 ? (
            <div className="flex items-center justify-center h-96 relative z-10">
              <p className="text-white text-lg">Loading lessons...</p>
            </div>
          ) : (
            <LessonsList courseId={courseId} lessons={lessons} />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LearningMap;