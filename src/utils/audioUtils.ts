/**
 * Convert audio blob to WAV format at 16kHz sample rate
 * This ensures compatibility with pronunciation assessment APIs
 */
export const convertToWav16k = async (audioBlob: Blob): Promise<Blob> => {
  const audioContext = new AudioContext({ sampleRate: 48000 });
  
  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Resample to 16kHz
    const offlineCtx = new OfflineAudioContext(
      1, // mono
      Math.ceil(audioBuffer.duration * 16000),
      16000
    );
    
    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineCtx.destination);
    source.start();
    
    const resampled = await offlineCtx.startRendering();
    const samples = resampled.getChannelData(0);
    
    // Create WAV file
    const wavBlob = createWavBlob(samples, 16000);
    
    await audioContext.close();
    
    return wavBlob;
  } catch (error) {
    await audioContext.close();
    throw error;
  }
};

/**
 * Create WAV blob from Float32Array PCM data
 */
const createWavBlob = (samples: Float32Array, sampleRate: number): Blob => {
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataBytes = samples.length * blockAlign;
  const buffer = new ArrayBuffer(44 + dataBytes);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // WAV header
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataBytes, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // bits per sample
  writeString(36, 'data');
  view.setUint32(40, dataBytes, true);

  // PCM data
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const sample = Math.max(-1, Math.min(1, samples[i]));
    const value = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    view.setInt16(offset, value, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
};

/**
 * Validate audio duration (minimum 0.3 seconds)
 */
export const validateAudioDuration = async (audioBlob: Blob): Promise<boolean> => {
  try {
    const audioContext = new AudioContext();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    await audioContext.close();
    
    return audioBuffer.duration >= 0.3;
  } catch {
    return false;
  }
};
