import { api } from '@api/axios/index';

export interface ConversationData {
  userText: string;
  aiText: string;
  userAudioUrl: string;
  aiAudioUrl: string;
}

interface ConversationApiResponse {
  success: boolean;
  message: string;
  data: ConversationData;
}

/**
 * Send recorded audio to AI conversation endpoint.
 *
 * Backend contract (AIConversationController):
 *   POST /api/conversation  (multipart/form-data)
 *   Fields:
 *     - audio: MultipartFile  (contentType must start with "audio/")
 *     - conversationId: string (pattern: ^[a-zA-Z0-9-]+$)
 *   Response: { success, message, data: { userText, aiText, userAudioUrl, aiAudioUrl } }
 *
 * NOTE: axios interceptor already unwraps response.data,
 *       so api.post() returns the inner { success, message, data } directly.
 */
export const sendConversationAudio = async (
  audioBlob: Blob,
  conversationId: string
): Promise<ConversationData> => {
  const formData = new FormData();
  // Append as 'audio' — must match ConversationRequest.audio field name
  formData.append('audio', audioBlob, 'recording.wav');
  // Must match pattern ^[a-zA-Z0-9-]+$
  formData.append('conversationId', conversationId);

  console.log('📤 Sending to /api/conversation:', {
    audioSize: audioBlob.size,
    audioType: audioBlob.type,
    conversationId,
  });

  // Interceptor unwraps response.data, so result is ConversationApiResponse
  const result = await api.post('/api/conversation', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120_000, // 2 min — Whisper transcription can be slow
  }) as unknown as ConversationApiResponse;

  console.log('📥 API response:', result);

  if (!result.success || !result.data) {
    throw new Error(result.message || 'Conversation API failed');
  }

  return result.data;
};
