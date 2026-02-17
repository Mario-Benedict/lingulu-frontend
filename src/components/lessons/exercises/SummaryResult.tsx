import React from 'react';
import { useTranslation } from 'react-i18next';
import summaryMascot from '@assets/lessons/summary-multiplechoice.svg';

interface Answer {
  questionNumber: number;
  questionText: string;
  selectedOption: string;
  isCorrect: boolean;
}

interface SummaryResultProps {
  score: number;
  totalQuestions: number;
  answers: Answer[];
  onRetry: () => void;
  onFinish: () => void;
}

const SummaryResult: React.FC<SummaryResultProps> = ({
  score,
  totalQuestions,
  answers,
  onRetry,
  onFinish,
}) => {
  const { t } = useTranslation();
  const percentage = score;


  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 flex flex-col font-rubik">
      <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
        
        {/* Header Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-orange-500 mb-6 sm:mb-4">
          {t('lessons.resultSummary')}
        </h1>

        {/* Mascot & Score Section */}
        <div className="relative flex flex-col items-center mb-8 sm:mb-10 flex-shrink-0">
          {/* Confetti Background effect can be added here if needed, but we keep the mascot clean */}
          <img
            src={summaryMascot}
            alt="Result Mascot"
            className="w-80 sm:w-96 md:w-[28rem] object-contain relative z-10"
          />
          
          {/* Semi-circle base for Score */}
          <div className="bg-yellow-50/80 rounded-t-[100px] w-64 sm:w-80 h-24 sm:h-32 -mt-12 sm:-mt-16 z-0 flex items-end justify-center pb-2 border-t-4 border-white shadow-[0_-10px_20px_rgba(255,255,255,0.8)]">
            <div className="flex items-baseline relative z-20 transform translate-y-8">
              {/* Score Number with shadow */}
              <span 
                className="text-6xl sm:text-7xl md:text-8xl font-black text-primary drop-shadow-lg font-poppins"
                style={{
                  textShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06), -2px 2px 4px rgba(0, 0, 0, 0.08)'
                }}
              >
                {percentage}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-black ml-1 drop-shadow-md">
                /100
              </span>
            </div>
          </div>
        </div>

        {/* Review Box Section - SCROLLABLE */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-orange-300 shadow-sm p-4 sm:p-6 mb-8">
            
            {/* Box Header (9/10 Review) */}
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-xl font-medium text-black mb-1">
                {answers?.filter(a => a.isCorrect).length}/{totalQuestions}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] bg-orange-300 flex-1 max-w-[100px]"></div>
                <span className="text-orange-500 text-lg sm:text-xl font-medium">{t('lessons.review')}</span>
                <div className="h-[1px] bg-orange-300 flex-1 max-w-[100px]"></div>
              </div>
            </div>

            {/* Answer Cards List */}
            <div className="space-y-3 sm:space-y-4 font-poppins">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`flex rounded-lg border overflow-hidden transition-all ${
                    answer.isCorrect
                      ? 'border-green-400 bg-[#ebf8f0]' // Light green background
                      : 'border-red-400 bg-[#fdeeee]'   // Light red background
                  }`}
                >
                  {/* Left side: Soal Number */}
                  <div className="w-16 sm:w-20 md:w-24 flex-shrink-0 bg-orange-100/70 border-r border-orange-200 flex flex-col items-center justify-center p-2">
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">
                      Soal {answer.questionNumber}
                    </span>
                  </div>

                  {/* Middle side: Question & User Answer */}
                  <div className="flex-1 p-3 sm:p-4 min-w-0 flex flex-col justify-center">
                    <p className="text-xs sm:text-sm text-gray-800 mb-2 truncate whitespace-normal">
                      {answer.questionText}
                    </p>
                    {/* Teks "Jawaban kamu :" digabungkan dengan opsinya jika memungkinkan */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                      {t('lessons.yourAnswer')}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                        {answer.selectedOption}
                      </p>
                    </div>
                  </div>

                  {/* Right side: Status Icon */}
                  <div className="w-12 sm:w-16 flex-shrink-0 flex items-center justify-center pr-2">
                    {answer.isCorrect ? (
                      // Green Checkmark Icon
                      <svg
                        className="w-7 h-7 sm:w-8 sm:h-8 text-green-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ) : (
                      // Red X Icon
                      <svg
                        className="w-7 h-7 sm:w-8 sm:h-8 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-4 flex-shrink-0 pb-12">
          <button
            onClick={onRetry}
            className="w-full px-6 py-2.5 sm:py-3 border-2 border-orange-500 text-orange-500 bg-white rounded-lg font-medium text-sm sm:text-base hover:bg-orange-50 transition-colors"
          >
            {t('lessons.retry')}
          </button>
          <button
            onClick={onFinish}
            className="w-full px-6 py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-orange-600 transition-colors shadow-md"
          >
            {t('lessons.finish')}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default SummaryResult;