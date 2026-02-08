import { useState } from 'react';
import learningMapBg from '@assets/lessons/learning-map-new.png';
import PageLayout from '@components/common/PageLayout';
import LearningMapHeader from '@components/lessons/learningmap/LearningMapHeader';
import LessonsList from '@components/lessons/learningmap/LessonsList';
import type { Lesson } from '@/types';

const LearningMap: React.FC = () => {
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
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0 font-poppins h-full">
        <div className="flex-1 overflow-hidden relative">
          <div
            className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
            style={{ backgroundImage: `url(${learningMapBg})` }}
          />
          <LearningMapHeader
            title="Basic English Conversation"
            subtitle="4 Lessons - Beginner"
          />
          <LessonsList lessons={lessons} />
        </div>
      </div>
    </PageLayout>
  );
};

export default LearningMap;
