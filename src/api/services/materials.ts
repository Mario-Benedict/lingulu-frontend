import type { ApiResponse, SectionContent } from '@/types';
import { api } from '@api/axios';

export const getMaterialContent = async (materialId: string): Promise<ApiResponse<SectionContent>> => {
  return await api.get(`/learning/sections/${materialId}/content`);
};

export const markMaterialAsCompleted = async (sectionId: string): Promise<ApiResponse<null>> => {
  return await api.post('/learning/section/complete', sectionId);
};