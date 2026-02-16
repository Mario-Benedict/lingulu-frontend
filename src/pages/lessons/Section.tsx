import { BookOpenText, FileText, ClipboardList, Mic } from 'lucide-react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '@components/common/PageLayout';
import SectionHeader from '@components/lessons/section/SectionHeader';
import SectionCard from '@components/lessons/section/SectionCard';
import { api } from '@api/axios/instance';
import { getSectionsByLesson, getLessonsByCourse } from '@/api/services';

interface SectionData {
  id: number;
  title: string;
  description?: string;
  icon: typeof BookOpenText;
  type: 'material' | 'exercise' | 'pronunciation';
}

const Section: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // Get courseId from query param first, fallback to state
  const courseId = searchParams.get('courseId') || (location.state?.courseId as string | undefined);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('Section');
  const [courseTitle, setCourseTitle] = useState('Level 1: Beginner');

  // Debug state updates
  useEffect(() => {
    console.log('🔄 State updated - lessonId:', lessonId, 'courseId:', courseId, 'lessonTitle:', lessonTitle, 'courseTitle:', courseTitle);
  }, [lessonId, courseId, lessonTitle, courseTitle]);

  useEffect(() => {
    const fetchSections = async () => {
      if (!lessonId) {
        setError('No lesson selected');
        setLoading(false);
        return;
      }

      console.log('🔍 Fetching sections for lessonId:', lessonId, 'courseId:', courseId);

      try {
        setLoading(true);
        
        // Fetch sections for this lesson (backend uses @RequestBody with GET)
        const response = await getSectionsByLesson(lessonId);
        const sectionsData = response.data ?? [];
        
        console.log('📋 Sections response:', sectionsData);
        
        // Fetch lesson title and course title
        try {
          if (courseId) {
            // If courseId is available, fetch directly
            const coursesRes = await api.get('/learning/progress/courses');
            const courses = coursesRes.data ?? [];
            const course = courses.find((c: any) => c.courseId === courseId);
            
            if (course) {
              setCourseTitle(course.courseTitle || 'Level 1: Beginner');
            }
            
            // Get lessons for this course to find lesson index
            const lessonsRes = await getLessonsByCourse(courseId);
            const lessons = lessonsRes.data ?? [];
            const lessonIndex = lessons.findIndex((l: any) => l.lessonId === lessonId);
            
            if (lessonIndex >= 0) {
              setLessonTitle(`Lesson ${lessonIndex + 1}`);
              console.log('✅ Found lesson at index:', lessonIndex);
            }
          } else {
            // Fallback: Search through all courses
            const coursesRes = await api.get('/learning/progress/courses');
            const courses = coursesRes.data ?? [];
            console.log('📚 No courseId, searching all courses:', courses.length);
            
            for (const course of courses) {
              const lessonsRes = await getLessonsByCourse(course.courseId);
              const lessons = lessonsRes.data ?? [];
              const lessonIndex = lessons.findIndex((l: any) => l.lessonId === lessonId);
              
              if (lessonIndex >= 0) {
                setLessonTitle(`Lesson ${lessonIndex + 1}`);
                setCourseTitle(course.courseTitle || 'Level 1: Beginner');
                console.log('✅ Lesson found in course:', course.courseTitle);
                break;
              }
            }
          }
        } catch (titleErr) {
          console.error('⚠️ Error fetching lesson title:', titleErr);
        }
        
        // Map backend response to SectionData
        const mappedSections: SectionData[] = sectionsData.map((section: any, index: number) => {
          // Generate icon and type based PRIMARILY on sectionType from backend
          let icon: typeof BookOpenText = BookOpenText;
          let type: 'material' | 'exercise' | 'pronunciation' = 'material';
          
          // sectionType comes from backend as enum (e.g., "MATERIAL", "PRONUNCIATION", "EXERCISE")
          const sectionType = section.sectionType?.toUpperCase() || '';
          
          console.log(`🔍 Section ${index + 1}: "${section.sectionTitle}" | type: ${section.sectionType}`, section);
          
          // Map backend sectionType enum to frontend type
          if (sectionType === 'PRONUNCIATION' || sectionType === 'SPEAKING') {
            icon = Mic;
            type = 'pronunciation';
          } else if (sectionType === 'EXERCISE' || sectionType === 'QUIZ' || sectionType === 'MCQ') {
            icon = ClipboardList;
            type = 'exercise';
          } else if (sectionType === 'MATERIAL' || sectionType === 'CONTENT' || sectionType === 'READING' || sectionType === 'GRAMMAR' || sectionType === 'VOCAB') {
            icon = FileText;
            type = 'material';
          } else {
            // Fallback: default to material if type is unknown
            icon = BookOpenText;
            type = 'material';
          }
          
          console.log(`  → type: ${type}, status: ${section.status}`);
          
          return {
            id: index + 1,
            title: section.sectionTitle || `Section ${index + 1}`,
            description: getDescriptionForSection(type),
            icon,
            type,
            status: section.status || 'NOT_STARTED',
          };
        });
        
        // Sort sections by custom priority
        // Priority: Grammar → Vocab → Speaking → MCQ
        const getSortPriority = (section: SectionData, originalTitle: string) => {
          const titleLower = originalTitle?.toLowerCase() || '';
          
          if (titleLower.includes('grammar')) return 0;
          if (titleLower.includes('vocab')) return 1;
          if (titleLower.includes('speaking') || section.type === 'pronunciation') return 2;
          if (section.type === 'exercise') return 3;
          
          // Default for other materials
          return 0.5;
        };
        
        const sortedSections = mappedSections.length > 0 
          ? mappedSections.map((section, idx) => ({
              ...section,
              originalTitle: sectionsData[idx]?.sectionTitle
            }))
            .sort((a, b) => {
              const aPriority = getSortPriority(a, a.originalTitle);
              const bPriority = getSortPriority(b, b.originalTitle);
              
              if (aPriority !== bPriority) {
                return aPriority - bPriority;
              }
              
              // Same priority: maintain original order
              return a.id - b.id;
            })
            .map(({ originalTitle, ...section }) => section)
          : getDefaultSections();
        
        setSections(sortedSections);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching sections:', err);
        setSections(getDefaultSections());
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [lessonId, courseId]);

  const getDescriptionForSection = (type: 'material' | 'exercise' | 'pronunciation'): string => {
    const descriptionMap = {
      material: 'Pelajari materi untuk memahami konsep utama',
      pronunciation: 'Latihan berbicara dengan rekaman suara',
      exercise: 'Uji pemahaman dengan soal pilihan ganda',
    };
    return descriptionMap[type] || 'Latihan pembelajaran';
  };

  const getDefaultSections = (): SectionData[] => [
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

  if (loading) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout activeMenu="lessons" showHeader={false}>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout activeMenu="lessons" showHeader={false}>
      <div className="flex-1 flex flex-col min-w-0 font-poppins">
        <SectionHeader levelTitle={courseTitle} lessonTitle={lessonTitle} courseId={courseId} />
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
