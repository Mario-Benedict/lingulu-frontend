import { useNavigate } from 'react-router-dom';
import LessonCircleButton from './LessonCircleButton';
import type { Lesson } from '@/types';

interface LessonsListProps {
  lessons: Lesson[];
}

const LessonsList: React.FC<LessonsListProps> = ({ lessons }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full flex items-center justify-center font-poppins">
      <div className="flex flex-col gap-[5.5rem] items-end pl-10 pt-2">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="flex flex-col items-end">
            <LessonCircleButton
              status={lesson.status}
              lessonId={lesson.id}
              onClick={
                lesson.status !== 'locked'
                  ? () => navigate(`/lessons/${lesson.id}`)
                  : undefined
              }
              disabled={lesson.status === 'locked'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
