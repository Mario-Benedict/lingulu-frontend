import React from 'react';
import { useTranslation } from 'react-i18next';

interface SpeakingReviewProps {
  score: number;
  text: string;
  corrections?: ('correct' | 'okay' | 'incorrect')[];
  feedback: string;
  onNext: () => void;
  onRetry: () => void;
}

const SpeakingReview: React.FC<SpeakingReviewProps> = ({
  score,
  text,
  corrections,
  feedback,
  onNext,
  onRetry,
}) => {
  const { t } = useTranslation(); 
  const renderCorrectionText = (text: string, corrections?: ('correct' | 'okay' | 'incorrect')[]) => {
    const words = text.split(' ');


    const correctionColors = {
      correct: 'bg-[#c8e6c9] text-[#2e7d32]',       // Background hijau pastel terang, text hijau gelap
      okay: 'bg-[#fff9c4] text-[#f57f17]',         // Background kuning pastel terang, text kuning gelap
      incorrect: 'bg-[#ffcdd2] text-[#c62828]',    // Background merah pastel terang, text merah gelap
    };

    return (
      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
        {words.map((word, index) => {
          const status = corrections?.[index] || 'correct';
          return (
            <span
              key={index}
              className={`px-2 py-1 rounded text-sm font-medium ${correctionColors[status]}`}
              title={`Status: ${status}`}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary">
          {t('lessons.speakingReview')}
        </h2>

        {/* Score */}
        <div className="text-center mb-6">
          <div className="text-6xl sm:text-7xl font-bold text-orange-500 mb-2" style={{ textShadow: '0 4px 12px rgba(255, 107, 53, 0.6), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
            {score.toFixed(1).replace('.', ',')}
          </div>
        </div>

        {/* Word Corrections */}
        {renderCorrectionText(text, corrections)}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs sm:text-sm font-poppins">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#ffcdd2]"></div>
            <span className="text-gray-700">{t('lessons.incorrect')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#fff9c4]"></div>
            <span className="text-gray-700">{t('lessons.okay')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#c8e6c9]"></div>
            <span className="text-gray-700">{t('lessons.correct')}</span>
          </div>
        </div>

        {/* Feedback Text */}
        <p className="text-center text-sm sm:text-base text-gray-700 mb-6 font-poppins">
          {feedback}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-2.5 sm:py-3 bg-lessongray-500 text-white font-medium text-base sm:text-lg rounded-lg hover:bg-lessongray-600 transition-colors"
          >
            {t('lessons.retry')}
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-2.5 sm:py-3 bg-orange-500 text-white font-medium text-base sm:text-lg rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t('lessons.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingReview;
