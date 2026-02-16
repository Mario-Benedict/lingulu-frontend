import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import learningMapBg from '@assets/lessons/learning-map-new.png';
import PageLayout from '@components/common/PageLayout';
import LearningMapHeader from '@components/lessons/learningmap/LearningMapHeader';
import LessonsList from '@components/lessons/learningmap/LessonsList';
import type { Lesson } from '@/types';
import { api } from '@api/axios/instance';
import { getLessonsByCourse } from '@/api/services/user';

const LearningMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
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
        
        // Fetch course info to get title
        const coursesRes = await api.get('/learning/progress/courses');
        const courses = coursesRes.data ?? [];
        const selectedCourse = courses.find((c: any) => c.courseId === courseId);
        
        if (selectedCourse) {
          setCourseTitle(selectedCourse.courseTitle || 'Learning Course');
        }
        
        // Fetch lessons for this course
        const lessonsRes = await getLessonsByCourse(courseId);
        console.log('📖 Lessons response:', lessonsRes);
        
        const lessonsData = lessonsRes.data ?? [];
        
        // Map backend response to Lesson type
        const mappedLessons: Lesson[] = lessonsData.map((lesson: any, index: number) => {
          // Map ProgressStatus enum to lesson status
          let lessonStatus: 'completed' | 'in-progress' | 'locked' = 'locked';
          
          if (lesson.status === 'COMPLETED') {
            lessonStatus = 'completed';
          } else if (lesson.status === 'IN_PROGRESS') {
            lessonStatus = 'in-progress';
          } else if (lesson.status === 'NOT_STARTED') {
            lessonStatus = 'locked';
          }
          
          return {
            id: index + 1,
            lessonUuid: lesson.lessonId,
            title: lesson.lessonTitle || `Lesson ${index + 1}`,
            description: lesson.description || '',
            status: lessonStatus,
          };
        });
        
        setLessons(mappedLessons.length > 0 ? mappedLessons : getDefaultLessons());
      } catch (err) {
        console.error('❌ Error fetching lessons:', err);
        setLessons(getDefaultLessons());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const getDefaultLessons = (): Lesson[] => [
    { id: 1, lessonUuid: 'demo-1', title: 'Lesson 1', description: 'Introduction', status: 'completed' },
    { id: 2, lessonUuid: 'demo-2', title: 'Lesson 2', description: 'Basic Phrases', status: 'in-progress' },
    { id: 3, lessonUuid: 'demo-3', title: 'Lesson 3', description: 'Conversations', status: 'locked' },
    { id: 4, lessonUuid: 'demo-4', title: 'Lesson 4', description: 'Advanced Topics', status: 'locked' },
  ];

  // Determine level from course title
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
            <LessonsList lessons={lessons} />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LearningMap;