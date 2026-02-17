import { useNavigate } from 'react-router-dom';
import LessonCircleButton from './LessonCircleButton';
import type { LessonProgress } from '@/types/progress';

interface LessonsListProps {
  courseId: string | undefined;
  lessons: LessonProgress[];
}

const LessonsList: React.FC<LessonsListProps> = ({ courseId, lessons }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full flex items-center justify-center font-poppins pt-20 sm:pt-0">
      <div className="flex flex-col gap-16 sm:gap-[5.5rem] items-center sm:items-end pl-0 sm:pl-10">
        {lessons.map((lesson, index) => (
          <div key={lesson.lessonId} className="flex flex-col items-end">
            <LessonCircleButton
              status={lesson.status}
              lessonId={index + 1}
              onClick={
                lesson.status !== 'NOT_STARTED'
                  ? () => navigate(`/lessons/${courseId}/${lesson.lessonId}`)
                  : undefined
              }
              disabled={lesson.status === 'NOT_STARTED'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
