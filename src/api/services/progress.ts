import { api } from "@api/axios";

export const getLessonsByCourse = async (courseId: string): Promise<any> => {
  return await api.get(`/learning/progress/lessons?courseId=${courseId}`);
};

export const getSectionsByLesson = async (lessonId: string): Promise<any> => {
  return await api.get(`/learning/progress/sections?lessonId=${lessonId}`);
};