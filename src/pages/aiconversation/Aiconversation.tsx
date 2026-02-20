import { useState, useCallback, useEffect } from 'react';
import PageLayout from '@components/common/PageLayout';
import ConversationHeader from '@components/aiconversation/ConversationHeader';
import MessageList from '@components/aiconversation/MessageList';
import ConversationInput from '@components/aiconversation/ConversationInput';
import type { ConversationMessage } from '@/types';
import { sendConversationAudio, getConversationHistory } from '@/api/services';
import { useTranslation } from 'react-i18next';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { convertToWav16k, validateAudioDuration } from '@/utils/audioUtils';

const Aiconversation: React.FC = () => {
  const { t } = useTranslation();
  const { isRecording, startRecording, stopRecording, error: audioError } = useAudioRecorder();

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Show audio error if any
  useEffect(() => {
    if (audioError) {
      alert(t('conversation.cantAccessMic'));
    }
  }, [audioError, t]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const response = await getConversationHistory();
        const data = response.data!;

        if (data.conversationId && data.messages.length > 0) {
          const messagesWithId = data.messages.map((msg) => ({
            ...msg,
            id: crypto.randomUUID(),
          }));
          setMessages(messagesWithId);
        } else {
          const greetingMessage: ConversationMessage = {
            role: 'AI',
            text: "Hello! I'm your English tutor. Are you ready to speak with me?",
            createdAt: new Date().toISOString(),
          };
          setMessages([greetingMessage]);
        }
      } catch {
        const greetingMessage: ConversationMessage = {
          role: 'AI',
          text: "Hello! I'm your English tutor. Are you ready to speak with me?",
          createdAt: new Date().toISOString(),
        };
        setMessages([greetingMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleTapToSpeak = useCallback(async () => {
    if (isLoading) return;

    if (!isRecording) {
      // Start recording
      await startRecording();
    } else {
      // Stop recording and process
      setIsLoading(true);
      const audioBlob = await stopRecording();

      if (!audioBlob) {
        setIsLoading(false);
        return;
      }

      // Validate audio duration
      const isValid = await validateAudioDuration(audioBlob);
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      try {
        // Convert to WAV 16kHz format for conversation API
        const wavBlob = await convertToWav16k(audioBlob);
        
        const response = await sendConversationAudio(wavBlob);
        const data = response.data!;

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'USER',
            text: data.userText,
            createdAt: data.createdAt,
            audioUrl: data.userAudioUrl,
          },
          {
            id: crypto.randomUUID(),
            role: 'AI',
            text: data.aiText,
            createdAt: data.createdAt,
            audioUrl: data.aiAudioUrl,
          },
        ]);
      } catch {
        alert(t('conversation.failedToProcessAudio'));
      } finally {
        setIsLoading(false);
      }
    }
  }, [isRecording, isLoading, t, startRecording, stopRecording]);

  if (isLoading && messages.length === 0) {
    return (
      <PageLayout activeMenu="conversation" showHeader={false} className="flex flex-col">
        <ConversationHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-gray-600">{t('common.loading')}</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      activeMenu="conversation" 
      showHeader={false}
      className="flex flex-col"
    >
      <ConversationHeader />
      <div className="flex-1 flex flex-col min-h-0">
        <MessageList messages={messages} />
        <ConversationInput
          isRecording={isRecording}
          isLoading={isLoading}
          onTapToSpeak={handleTapToSpeak}
        />
      </div>
    </PageLayout>
  );
};

export default Aiconversation;