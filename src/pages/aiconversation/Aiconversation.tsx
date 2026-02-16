import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@components/common/PageLayout';
import ConversationHeader from '@components/aiconversation/ConversationHeader';
import MessageList from '@components/aiconversation/MessageList';
import ConversationInput from '@components/aiconversation/ConversationInput';
import type { Message } from '@/types';
import { sendConversationAudio } from '@api/services/conversation';

const makeId = () =>
  crypto.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const float32ToWavBlob = (samples: Float32Array, sampleRate: number): Blob => {
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataBytes = samples.length * blockAlign;
  const buffer = new ArrayBuffer(44 + dataBytes);
  const v = new DataView(buffer);

  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(off + i, s.charCodeAt(i));
  };

  writeStr(0, 'RIFF');
  v.setUint32(4, 36 + dataBytes, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, numChannels, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * blockAlign, true);
  v.setUint16(32, blockAlign, true);
  v.setUint16(34, 16, true);
  writeStr(36, 'data');
  v.setUint32(40, dataBytes, true);

  let off = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    off += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
};

const downsampleTo16k = (samples: Float32Array, fromRate: number): Float32Array => {
  if (fromRate === 16000) return samples;

  const ratio = fromRate / 16000;
  const newLength = Math.round(samples.length / ratio);
  const result = new Float32Array(newLength);

  for (let i = 0; i < newLength; i++) {
    const srcIndex = i * ratio;
    const lo = Math.floor(srcIndex);
    const hi = Math.min(lo + 1, samples.length - 1);
    const frac = srcIndex - lo;
    result[i] = samples[lo] * (1 - frac) + samples[hi] * frac;
  }

  return result;
};

const Aiconversation: React.FC = () => {
  const { t } = useTranslation();
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const pcmChunksRef = useRef<Float32Array[]>([]);
  const conversationIdRef = useRef(makeId());

  const lastAiAudioUrlRef = useRef<string | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello! I'm your English tutor. Are you ready to speak with me?",
      timestamp: new Date(Date.now() - 300000),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTapToSpeak = useCallback(async () => {
    if (isLoading) return;

    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
          },
        });

        streamRef.current = stream;

        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        const processor = ctx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        pcmChunksRef.current = [];

        processor.onaudioprocess = (e) => {
          const input = e.inputBuffer.getChannelData(0);
          pcmChunksRef.current.push(new Float32Array(input));
        };

        source.connect(processor);
        processor.connect(ctx.destination);

        setIsRecording(true);
        console.log('🎤 Recording started');
      } catch (err: any) {
        console.error('❌ Mic error:', err);
        alert('Cannot access microphone: ' + err.message);
      }
    } else {
      processorRef.current?.disconnect();
      streamRef.current?.getTracks().forEach((t) => t.stop());

      setIsRecording(false);
      setIsLoading(true);

      const chunks = pcmChunksRef.current;
      const actualRate = audioCtxRef.current?.sampleRate ?? 48000;
      const totalFrames = chunks.reduce((n, c) => n + c.length, 0);

      if (totalFrames < actualRate * 0.3) {
        console.warn('⚠️ Recording too short');
        setIsLoading(false);
        return;
      }

      const merged = new Float32Array(totalFrames);
      let off = 0;
      for (const c of chunks) {
        merged.set(c, off);
        off += c.length;
      }

      const resampled = downsampleTo16k(merged, actualRate);
      const wavBlob = float32ToWavBlob(resampled, 16000);

      try {
        const data = await sendConversationAudio(wavBlob, conversationIdRef.current);

        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            type: 'user',
            text: data.userText,
            timestamp: new Date(),
          },
          {
            id: makeId(),
            type: 'bot',
            text: data.aiText,
            timestamp: new Date(),
          },
        ]);

        if (data.aiAudioUrl) {
          lastAiAudioUrlRef.current = data.aiAudioUrl;
          playAudio(data.aiAudioUrl);
        }
      } catch (err: any) {
        console.error('❌ Send error:', err);
        alert('Failed to process audio. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [isRecording, isLoading]);

  const playAudio = useCallback((url: string) => {
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current = null;
    }
    const audio = new Audio(url);
    audioElRef.current = audio;
    audio.play().catch((e) => console.warn('Autoplay blocked:', e));
  }, []);

  const handleListenAgain = useCallback(() => {
    const url = lastAiAudioUrlRef.current;
    if (!url) return;
    playAudio(url);
  }, [playAudio]);

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
          onListenAgain={handleListenAgain}
        />
      </div>
    </PageLayout>
  );
};

export default Aiconversation;