import { BookOpenText, FileText, ClipboardList, Mic } from 'lucide-react';
import PageLayout from '@components/common/PageLayout';
import SectionHeader from '@components/lessons/section/SectionHeader';
import SectionCard from '@components/lessons/section/SectionCard';

const Section: React.FC = () => {
  const sections: Array<{
    id: number;
    title: string;
    description?: string;
    icon: typeof BookOpenText;
    type: 'material' | 'exercise' | 'pronunciation';
  }> = [
    {
      id: 1,
      title: 'Judul materi',
      description: 'Pelajari materi dasar untuk memahami konsep utama',
      icon: BookOpenText,
      type: 'material',
    },
    {
      id: 2,
      title: 'Materi Tambahan',
      description: 'Materi pelengkap untuk memperdalam pemahaman',
      icon: FileText,
      type: 'material',
    },
    {
      id: 3,
      title: 'Latihan Pronunciation',
      description: 'Latihan berbicara dengan rekaman suara',
      icon: Mic,
      type: 'pronunciation',
    },
    {
      id: 4,
      title: 'Latihan Pilihan Ganda',
      description: 'Uji pemahaman dengan soal pilihan ganda',
      icon: ClipboardList,
      type: 'exercise',
    },
  ];

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        <SectionHeader levelTitle="Level 1: Beginner" lessonTitle="Section 2" />
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="space-y-3 sm:space-y-4">
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  type={section.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Section;
