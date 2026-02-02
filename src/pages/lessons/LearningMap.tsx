import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import learningMapBg from '@assets/lessons/learning-map.svg';
import Sidebar from '@components/common/Sidebar';
import LessonCircleButton from '@components/lessons/LessonCircleButton';
import type { Lesson } from '@/types';

const LearningMap: React.FC = () => {
  const navigate = useNavigate();
  // Removed unused activeMenu state for consistency
  const [lessons] = useState<Lesson[]>([
    {
      id: 1,
      title: 'Lesson 1',
      description: 'Introduction',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Lesson 2',
      description: 'Basic Phrases',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Lesson 3',
      description: 'Conversations',
      status: 'locked',
    },
    {
      id: 4,
      title: 'Lesson 4',
      description: 'Advanced',
      status: 'locked',
    },
  ]);

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        {/* Main Learning Map Area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${learningMapBg})` }}
          />
          <div className='bg-white w-fit bg-opacity-70 flex flex-1 gap-5 p-5 mt-5 ml-5 absolute z-10 rounded-lg'>
            <button onClick={() => navigate('/lessons')} className='group transition p-4 hover:bg-gray-50 hover:shadow-orange-500 shadow-lg rounded-lg bg-orange-500'><ArrowLeft className="text-white font-semibold group-hover:text-gray-800" size={28} /></button>
            <div className='flex flex-1 flex-col'>
              <h2 className='text-gray-800 text-2xl font-semibold font-rubik'>Basic English Conversation</h2>
              <p className='text-gray-600 text-lg'>4 Lessons - Beginner</p>
            </div>
          </div>
          {/* Lessons Container - Vertical Layout */}
          <div className="relative w-full h-full flex items-center justify-center font-poppins">
            <div className="flex flex-col gap-[5.5rem] items-end pl-10 pt-[6rem]">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="flex flex-col items-end">
                  <LessonCircleButton
                    status={lesson.status}
                    lessonId={lesson.id}
                    onClick={lesson.status !== 'locked' ? () => navigate(`/lessons/${lesson.id}`) : undefined}
                    disabled={lesson.status === 'locked'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMap;
