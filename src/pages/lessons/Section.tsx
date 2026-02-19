import { BookOpenText, FileText, ClipboardList, Mic } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import PageLayout from '@components/common/PageLayout';
import SectionHeader from '@components/lessons/section/SectionHeader';
import SectionCard from '@components/lessons/section/SectionCard';
import { getCourseProgressDetail, getLessonProgressDetail, getSectionsProgress } from '@/api/services';
import type { SectionProgress } from '@/types/progress';
import type { LessonStatus, MaterialType } from '@/types/general';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SectionData {
  sectionId: string;
  title: string;
  description: string;
  icon: LucideIcon;
  type: 'material' | 'exercise' | 'pronunciation';
  status: LessonStatus;
}

const Section: React.FC = () => {
  const { t } = useTranslation();
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lessonTitle, setLessonTitle] = useState('Lesson');
  const [courseTitle, setCourseTitle] = useState('Learning Course');

  const getDescriptionForType = useCallback((type: 'material' | 'exercise' | 'pronunciation'): string => {
    const descriptionMap = {
      material: t('lessons.subtitleMaterial'),
      pronunciation: t('lessons.subtitlePronunciation'),
      exercise: t('lessons.subtitleExercise'),
    };
    return descriptionMap[type] || t('lessons.subtitleLearning');
  }, [t]);

  useEffect(() => {
    const fetchSections = async () => {
      if (!lessonId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        if (courseId) {
          const courseDetailRes = await getCourseProgressDetail({ courseId });
          if (courseDetailRes.data) {
            setCourseTitle(courseDetailRes.data.courseTitle || t('lessons.learningCourse'));
          }
        }
        
        const lessonDetailRes = await getLessonProgressDetail({ lessonId });
        if (lessonDetailRes.data?.title) {
          setLessonTitle(lessonDetailRes.data.title);
        }
        
        const sectionsRes = await getSectionsProgress({ lessonId });
        const sectionsData = sectionsRes.data ?? [];
        
        const mappedSections: SectionData[] = sectionsData.map((section: SectionProgress) => {
          const { icon, type } = getIconAndType(section.sectionType);
          
          return {
            sectionId: section.sectionId,
            title: section.sectionTitle,
            description: getDescriptionForType(type),
            icon,
            type,
            status: section.status,
          };
        });
        
        setSections(mappedSections);
      } catch {
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [lessonId, courseId, t, getDescriptionForType]);

  const getIconAndType = (sectionType: MaterialType): { icon: LucideIcon; type: 'material' | 'exercise' | 'pronunciation' } => {
    switch (sectionType) {
      case 'GRAMMAR':
        return { icon: BookOpenText, type: 'material' };
      case 'VOCABULARY':
        return { icon: FileText, type: 'material' };
      case 'SPEAKING':
        return { icon: Mic, type: 'pronunciation' };
      case 'MCQ':
        return { icon: ClipboardList, type: 'exercise' };
      default:
        return { icon: BookOpenText, type: 'material' };
    }
  };



  if (loading) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        <SectionHeader levelTitle={courseTitle} lessonTitle={lessonTitle} />
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="space-y-3 sm:space-y-4">
              {sections.map((section) => (
                <SectionCard
                  key={section.sectionId}
                  sectionId={section.sectionId}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  type={section.type}
                  status={section.status}
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
