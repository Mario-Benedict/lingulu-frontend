import type { LessonStatus, MaterialType } from "./general";

export type CourseProgress = {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    difficulty: string;
    status: LessonStatus;
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
};

export type LessonProgress = {
    lessonId: string;
    title: string;
    status: LessonStatus;
    completedAt: string | null;
};

export type SectionProgress = {
    sectionId: string;
    sectionTitle: string;
    sectionType: MaterialType;
    status: LessonStatus;
    completedAt: string | null;
};