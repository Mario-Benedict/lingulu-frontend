import type { CourseProgress, ApiResponse, LessonProgress, SectionProgress } from "@/types";
import { api } from "@api/axios";

export const getCoursesProgress = async (): Promise<ApiResponse<Array<CourseProgress>>> => {
  return await api.get("/learning/progress/courses");
};

export const getCourseProgressDetail = async (data: { courseId: string }): Promise<ApiResponse<CourseProgress>> => {
  return await api.get("/learning/progress/course/detail", { params: data});
}

export const getLessonsProgress = async (data: { courseId: string }): Promise<ApiResponse<Array<LessonProgress>>> => {
  return await api.get("/learning/progress/lessons", { params: data });
};

export const getLessonProgressDetail = async (data: { lessonId: string }): Promise<ApiResponse<LessonProgress>> => {
  return await api.get("/learning/progress/lesson/detail", { params: data });
}

export const getSectionsProgress = async (data: { lessonId: string }): Promise<ApiResponse<Array<SectionProgress>>> => {
  return await api.get("/learning/progress/sections", { params: data });
};