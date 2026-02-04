import { Lock, Clock, HelpCircle } from 'lucide-react';
import type { LessonLevelCardProps } from '@/types';

const LessonLevelCard: React.FC<LessonLevelCardProps> = ({
  title,
  description,
  bgColor,
  isLocked,
  isComingSoon,
  buttonText,
  buttonColor,
  lockMessage,
  mascotImage,
  progress,
  onStart,
}) => (
  <div className={`${bgColor} rounded-lg p-8 py-0 text-white shadow-lg flex items-center gap-2 min-h-64 overflow-hidden px-auto ${isComingSoon ? 'opacity-75' : ''}`}>
    {/* Character Image */}
    <div className="flex-shrink-0 flex items-center justify-center flex-col min-w-[320px] w-[320px] h-400px]">
      {isComingSoon ? (
        <div className="w-48 h-48 rounded-full bg-white bg-opacity-20 flex items-center justify-center animate-pulse">
          <HelpCircle size={120} className="text-white opacity-80" strokeWidth={1.5} />
        </div>
      ) : (
        <img src={mascotImage} alt={title} className="w-full h-full object-contain" />
      )}
        </div>
    {/* Content */}
    <div className="flex-1 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-5xl font-bold mb-3 font-rubik">{title}</h3>
        <p className="text-2xl font-poppins mb-6 opacity-95">{description}</p>
      </div>
      {/* Lock/Button Section */}
      {isComingSoon ? (
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-white bg-opacity-20 rounded-lg px-4 py-3 flex items-center gap-3 flex-row">
            <Clock size={24} />
            <span className="text-lg font-poppins">Coming Soon - Stay tuned!</span>
          </div>
          <button
            className="bg-white bg-opacity-50 text-white px-8 py-3 rounded-lg font-semibold font-rubik cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        </div>
      ) : isLocked ? (
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-white bg-opacity-20 rounded-lg px-4 py-3 flex items-center gap-3 flex-row">
            <Lock size={24} />
            <span className="text-lg font-poppins"> {lockMessage}</span>
          </div>
          <button
            className={`${buttonColor} px-8 py-3 rounded-lg font-semibold transition font-rubik`}
            disabled
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {progress !== undefined && (
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-poppins opacity-90">Progress</span>
                <span className="text-lg font-poppins font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          <button
            onClick={onStart}
            className={`${buttonColor} px-8 py-3 rounded-lg font-semibold transition font-rubik flex-shrink-0`}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  </div>
);

export default LessonLevelCard;
