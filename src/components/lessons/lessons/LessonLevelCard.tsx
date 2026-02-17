import { Lock, Clock, HelpCircle } from 'lucide-react';

type LessonLevelCardProps = {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  isLocked: boolean;
  isComingSoon?: boolean;
  buttonText: string;
  buttonColor: string;
  lockMessage?: string;
  mascotImage: string;
  progress?: number;
  onStart?: () => void;
};

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
  <div className={`${bgColor} rounded-lg p-4 sm:p-6 lg:p-8 py-4 sm:py-6 text-white shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 min-h-fit sm:min-h-48 lg:min-h-64 overflow-hidden ${isComingSoon ? 'opacity-75' : ''}`}>
    {/* Character Image */}
    <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 sm:w-40 sm:h-40 lg:w-[280px] lg:h-[280px]">
      {isComingSoon ? (
        <div className="w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-full bg-white bg-opacity-20 flex items-center justify-center animate-pulse">
          <HelpCircle size={48} className="sm:w-20 sm:h-20 lg:w-[120px] lg:h-[120px] text-white opacity-80" strokeWidth={1.5} />
        </div>
      ) : (
        <img src={mascotImage} alt={title} className="w-full h-full object-contain" />
      )}
    </div>
    
    {/* Content */}
    <div className="flex-1 flex flex-col justify-between h-full w-full text-center sm:text-left">
      <div>
        <h3 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 font-rubik">{title}</h3>
        <p className="text-sm sm:text-lg lg:text-2xl font-poppins mb-4 sm:mb-6 opacity-95">{description}</p>
      </div>
      
      {/* Lock/Button Section */}
      {isComingSoon ? (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="flex-1 bg-white bg-opacity-20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full">
            <Clock size={18} className="sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-lg font-poppins">Coming Soon - Stay tuned!</span>
          </div>
          <button
            className="w-full sm:w-auto bg-white bg-opacity-50 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold font-rubik cursor-not-allowed text-sm sm:text-base"
            disabled
          >
            Coming Soon
          </button>
        </div>
      ) : isLocked ? (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="flex-1 bg-white bg-opacity-20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full">
            <Lock size={18} className="sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-lg font-poppins">{lockMessage}</span>
          </div>
          <button
            className={`w-full sm:w-auto ${buttonColor} px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition font-rubik text-sm sm:text-base`}
            disabled
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {progress !== undefined && (
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm sm:text-lg font-poppins opacity-90">Progress</span>
                <span className="text-sm sm:text-lg font-poppins font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2 sm:h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          <button
            onClick={onStart}
            className={`w-full sm:w-auto ${buttonColor} px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition font-rubik flex-shrink-0 text-sm sm:text-base`}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  </div>
);

export default LessonLevelCard;
