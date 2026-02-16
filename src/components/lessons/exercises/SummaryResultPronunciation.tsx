import React from 'react';
import { useTranslation } from 'react-i18next';
import summaryMascot from '@assets/lessons/summary-pronunciation.svg';

interface PronunciationScore {
  questionNumber: number;
  questionText: string;
  score: number;
  corrections?: ('correct' | 'okay' | 'incorrect')[];
}

interface SummaryResultPronunciationProps {
  scores: PronunciationScore[];
  onRetry: () => void;
  onFinish: () => void;
}

const SummaryResultPronunciation: React.FC<SummaryResultPronunciationProps> = ({
  scores,
  onRetry,
  onFinish,
}) => {
  const { t } = useTranslation();

  // Fungsi untuk menampilkan kata dengan warna koreksi (benar/cukup/salah)
  const renderCorrectionText = (text: string, corrections?: ('correct' | 'okay' | 'incorrect')[]) => {
    const words = text.split(' ');
    
    // Color mapping berdasarkan koreksi status
    const correctionColors = {
      correct: 'bg-[#c8e6c9] text-[#2e7d32]',      // Background hijau pastel terang, text hijau gelap
      okay: 'bg-[#fff9c4] text-[#f57f17]',        // Background kuning pastel terang, text kuning gelap
      incorrect: 'bg-[#ffcdd2] text-[#c62828]',   // Background merah pastel terang, text merah gelap
    };

    return (
      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {words.map((word, index) => {
          // Gunakan corrections jika tersedia, jika tidak default ke 'correct'
          const status = corrections?.[index] || 'correct';
          return (
            <span
              key={index}
              className={`px-1.5 py-0.5 rounded text-sm sm:text-base font-medium ${
                correctionColors[status]
              }`}
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
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 flex flex-col font-rubik">
      <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
        
        {/* Header Title - Fixed */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-orange-500 mb-6 sm:mb-8 flex-shrink-0">
          {t('lessons.resultSummary')}
        </h1>

        {/* Legend/Info tentang warna koreksi - Fixed */}
        <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-poppins flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#c8e6c9]"></div>
            <span className="text-gray-700">{t('lessons.correct')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#fff9c4]"></div>
            <span className="text-gray-700">{t('lessons.okay')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#ffcdd2]"></div>
            <span className="text-gray-700">{t('lessons.incorrect')}</span>
          </div>
        </div>

        {/* Mascot Section - Fixed */}
        <div className="flex justify-center flex-shrink-0 -mb-6">
          <img
            src={summaryMascot}
            alt="Pronunciation Mascot"
            className="w-56 sm:w-72 md:w-80 object-contain"
          />
        </div>

        {/* Outer Card Container - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto min-h-0 mb-4">
          <div className="bg-white rounded-xl border border-orange-400 shadow-sm p-4 sm:p-5 md:p-6">
            
            {/* List of Scores */}
            <div className="space-y-3 sm:space-y-4 font-poppins">
            {scores.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row rounded-lg border border-orange-300 overflow-hidden bg-white"
              >
                {/* Left side: Soal Number */}
                <div className="w-full sm:w-20 md:w-24 bg-[#fdeedc] border-b sm:border-b-0 sm:border-r border-orange-300 flex-shrink-0 flex items-center justify-center py-2 sm:py-0">
                  <span className="text-gray-800 text-xs sm:text-sm font-medium">
                    {t('lessons.question')} {item.questionNumber}
                  </span>
                </div>

                {/* Middle side: Question Text with correction status */}
                <div className="flex-1 p-3 sm:p-4 min-w-0 flex items-center justify-center sm:justify-start">
                  {renderCorrectionText(item.questionText, item.corrections)}
                </div>

                {/* Right side: Average Score */}
                <div className="w-full sm:w-40 flex-shrink-0 flex items-center justify-center sm:justify-end px-4 py-2 sm:py-0 border-t sm:border-t-0 sm:border-l border-orange-100 sm:border-transparent bg-gray-50/50 sm:bg-transparent">
                  <p className="text-sm sm:text-base font-medium text-gray-800 uppercase">
                    {t('lessons.avgScore')} : {item.score}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed */}
        <div className="flex justify-center gap-4 sm:gap-6 flex-shrink-0">
          <button
            onClick={onRetry}
            className="w-32 sm:w-40 px-6 py-2.5 sm:py-3 border border-orange-400 text-orange-500 bg-white rounded-xl font-medium text-sm sm:text-base hover:bg-orange-50 transition-colors"
          >
            {t('lessons.retry')}
          </button>
          <button
            onClick={onFinish}
            className="w-32 sm:w-40 px-6 py-2.5 sm:py-3 bg-orange-500 text-white rounded-xl font-medium text-sm sm:text-base hover:bg-orange-600 transition-colors shadow-sm"
          >
            {t('lessons.finish')}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default SummaryResultPronunciation;