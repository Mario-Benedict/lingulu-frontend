import { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const InfoTooltip: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClickOpen, setIsClickOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsClickOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleButtonClick = () => {
    const nextState = !isClickOpen;
    setIsClickOpen(nextState);
    setIsOpen(nextState);
  };

  const handleMouseEnter = () => {
    if (!isClickOpen) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClickOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="p-3 hover:bg-lessongray-100 rounded-full transition-colors duration-300"
        aria-label="Information about AI Conversation"
      >
        <Info size={32} className="text-primary" />
      </button>

      {/* Tooltip Container */}
      <div
        className={`
          absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl
          border border-lessongray-200 p-5 z-20
          transform transition-all duration-300 ease-out will-change-transform
          ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }
        `}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lessongray-900 font-rubik text-lg">
            {t('conversation.infoTitle')}
          </h3>

          {isClickOpen && (
            <button
              onClick={() => {
                setIsOpen(false);
                setIsClickOpen(false);
              }}
              className="p-1 hover:bg-lessongray-100 rounded transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-lessongray-600" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-lessongray-700 font-poppins mb-1">
              {t('conversation.whatIsIt')}
            </p>
            <p className="text-sm text-lessongray-600 font-poppins leading-relaxed">
              {t('conversation.whatIsItDesc')}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-lessongray-700 font-poppins mb-1">
              {t('conversation.howToUse')}
            </p>
            <ul className="text-sm text-lessongray-600 font-poppins leading-relaxed space-y-1">
              <li>• {t('conversation.step1')}</li>
              <li>• {t('conversation.step2')}</li>
              <li>• {t('conversation.step3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
