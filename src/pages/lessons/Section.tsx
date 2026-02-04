import { BookOpenText, NotebookPen } from 'lucide-react';
import Sidebar from '@components/common/Sidebar';
import SectionHeader from '@components/lessons/section/SectionHeader';
import SectionCard from '@components/lessons/section/SectionCard';

const Section: React.FC = () => {
  const sections: Array<{
    id: number;
    title: string;
    icon: typeof BookOpenText;
    type: 'material' | 'exercise';
  }> = [
    {
      id: 1,
      title: 'Judul materi',
      icon: BookOpenText,
      type: 'material',
    },
    {
      id: 2,
      title: 'Judul Soal',
      icon: NotebookPen,
      type: 'exercise',
    },
  ];

  return (
    <div className="flex h-screen bg-lessongray-100 w-screen">
      <Sidebar activeMenu="lessons" />
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        <SectionHeader levelTitle="Level 1: Beginner" lessonTitle="Section 2" />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="space-y-4">
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  icon={section.icon}
                  type={section.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
