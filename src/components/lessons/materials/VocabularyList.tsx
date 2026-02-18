import { useState, useRef } from 'react';
import type { Vocabulary } from '@/types';
import { Volume2, Pause } from 'lucide-react';
import { env } from '@/config/env';
import { useTranslation } from 'react-i18next';

interface VocabularyListProps {
  vocabularyItems: Array<Vocabulary>;
}

const VocabularyList: React.FC<VocabularyListProps> = ({ vocabularyItems }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const { t } = useTranslation();

  const handlePlayAudio = (vocabId: string, audioPath: string) => {
    // Stop currently playing audio
    if (playingId && playingId !== vocabId) {
      const currentAudio = audioRefs.current.get(playingId);
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    // Get or create audio element
    let audio = audioRefs.current.get(vocabId);
    if (!audio) {
      // Check if audioPath is already a full URL (CDN link)
      const audioUrl = audioPath.startsWith('http://') || audioPath.startsWith('https://')
        ? audioPath
        : `${env.API_BASE_URL}${audioPath}`;
      
      audio = new Audio(audioUrl);
      audio.addEventListener('ended', () => setPlayingId(null));
      audioRefs.current.set(vocabId, audio);
    }

    // Toggle play/pause
    if (playingId === vocabId) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingId(null);
    } else {
      audio.play();
      setPlayingId(vocabId);
    }
  };

  if (!vocabularyItems || vocabularyItems.length === 0) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <p className="text-yellow-700 font-poppins">{t('lessons.noVocabularyAvailable')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header Row */}
      <div className="grid grid-cols-[2fr_2fr_auto] gap-4 pb-3 border-b-2 border-primary font-rubik">
        <div className="font-bold text-primary text-sm sm:text-base">{t('lessons.word')}</div>
        <div className="font-bold text-primary text-sm sm:text-base">{t('lessons.translation')}</div>
        <div className="font-bold text-primary text-sm sm:text-base">{t('lessons.audio')}</div>
      </div>

      {/* Vocabulary Rows */}
      {vocabularyItems.map((vocab) => (
        <div
          key={vocab.vocabId}
          className="grid grid-cols-[2fr_2fr_auto] gap-4 items-center py-3 border-b border-lessongray-200 hover:bg-lessongray-50 transition-colors rounded-lg px-2"
        >
          {/* Word */}
          <div className="font-poppins text-lessongray-800 text-sm sm:text-base font-semibold">
            {vocab.word}
          </div>

          {/* Translation */}
          <div className="font-poppins text-lessongray-700 text-sm sm:text-base">
            {vocab.translation}
          </div>

          {/* Audio Player Button */}
          <div className="flex justify-center">
            <button
              onClick={() => handlePlayAudio(vocab.vocabId, vocab.audioPath)}
              className={`p-2 rounded-full transition-all ${
                playingId === vocab.vocabId
                  ? 'bg-primary text-white'
                  : 'bg-lessongray-100 text-primary hover:bg-primary hover:text-white'
              }`}
              aria-label={`Play pronunciation for ${vocab.word}`}
            >
              {playingId === vocab.vocabId ? (
                <Pause size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VocabularyList;
