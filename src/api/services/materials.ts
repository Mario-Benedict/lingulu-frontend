import { api } from '@api/axios/index';

export interface MaterialContent {
  id: number;
  title: string;
  content: string;
  levelId: number;
  order: number;
}

interface MaterialApiResponse {
  success: boolean;
  message: string;
  data: MaterialContent;
}

/**
 * Fetch material markdown content from backend
 * 
 * Backend endpoint:
 *   GET /api/materials/{materialId}
 * 
 * Response: { success, message, data: { id, title, content, levelId, order } }
 */
export const fetchMaterialContent = async (materialId: string): Promise<MaterialContent> => {
  console.log('📥 Fetching material content:', { materialId });

  try {
    const result: MaterialApiResponse = await api.get(`/api/materials/${materialId}`);

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch material');
    }

    console.log('✅ Material content fetched successfully:', result.data);
    return result.data;
  } catch (error: any) {
    console.error('❌ Failed to fetch material:', error);
    throw new Error(error.message || 'Failed to fetch material content');
  }
};

/**
 * Fetch all materials for a specific level
 * 
 * Backend endpoint:
 *   GET /api/materials/level/{levelId}
 * 
 * Response: Array of MaterialContent
 */
export const fetchMaterialsByLevel = async (levelId: number): Promise<MaterialContent[]> => {
  console.log('📥 Fetching materials for level:', { levelId });

  try {
    const result: any = await api.get(`/api/materials/level/${levelId}`);

    console.log('✅ Materials fetched successfully');
    return Array.isArray(result) ? result : result.data || [];
  } catch (error: any) {
    console.error('❌ Failed to fetch materials:', error);
    throw new Error(error.message || 'Failed to fetch materials');
  }
};
