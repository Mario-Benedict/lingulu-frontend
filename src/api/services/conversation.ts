import type { ApiResponse, ConversationData, ConversationUpload } from '@/types';
import { api } from '@api/axios';

export const sendConversationAudio = async (
  audioBlob: Blob
): Promise<ApiResponse<ConversationUpload>> => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.wav');

  return await api.post('/conversation', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120_000,
  });
}

export const getConversationHistory = async (): Promise<ApiResponse<ConversationData>> => {
  return await api.get('/conversation/history');
}
