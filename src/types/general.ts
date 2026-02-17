export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
};

export type LessonStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type MaterialType = "GRAMMAR" | "VOCABULARY" | "SPEAKING" | "MCQ";