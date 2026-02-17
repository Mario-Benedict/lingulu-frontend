import { api } from '@api/axios';
import type { ApiResponse } from '@/types';


// Submit MCQ answers for a section
// Submit MCQ answers for a section (LearningController style)
export const submitSectionMCQ = async (
  payload: {
    sectionId: string;
    answers: Array<{ questionId: string; answerId: string }>;
  }
): Promise<ApiResponse<any>> => {
  // Endpoint sesuai backend: /api/learning/section/attempt
  const response = await api.post('/learning/section/attempt', payload);
  return response;
};

// Fetch MCQ dari section content
export const getSectionMCQ = async (sectionId: string): Promise<ApiResponse<any>> => {
  // Endpoint sesuai backend: /api/sections/{sectionId}/content
  const response = await api.get(`/sections/${sectionId}/content`);
  // MCQ biasanya ada di response.data.data (SectionContentResponse)
  // Silakan sesuaikan parsing jika struktur berbeda
  return response;
};


// Fetch MCQ khusus untuk mode Retry (bypass pengecekan nilai sebelumnya)
export const getSectionMCQRetry = async (sectionId: string): Promise<ApiResponse<any>> => {
  // Endpoint sesuai backend: /api/sections/{sectionId}/content-retry
  const response = await api.get(`/sections/${sectionId}/content-retry`);
  return response;
};
