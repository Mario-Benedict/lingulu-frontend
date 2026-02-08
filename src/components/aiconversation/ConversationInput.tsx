import { useTranslation } from 'react-i18next';
import { Mic, Volume2, Loader2 } from 'lucide-react';

interface ConversationInputProps {
  isRecording: boolean;
  isLoading?: boolean;
  onTapToSpeak: () => void;
  onListenAgain: () => void;
}

const ConversationInput: React.FC<ConversationInputProps> = ({
  isRecording,
  isLoading = false,
  onTapToSpeak,
  onListenAgain,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-lessongray-200">
      <div className="max-w-2xl mx-auto">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <div className="flex-1 h-px bg-lessongray-300"></div>
        </div>

        {/* Tap to Speak Button */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <button
            onClick={onTapToSpeak}
            disabled={isLoading}
            className={`w-full py-3 sm:py-4 rounded-full font-semibold font-poppins text-base sm:text-lg transition flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-lessongray-400 text-white cursor-not-allowed'
                : isRecording
                ? 'bg-record-red hover:bg-record-red-dark text-white animate-pulse'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">{t('conversation.processing', 'Processing...')}</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <Mic size={20} className="sm:w-6 sm:h-6" />
                {isRecording ? t('conversation.recording', 'RECORDING...') : t('conversation.tapToSpeak', 'TAP TO SPEAK')}
              </>
            )}
          </button>

          {/* Listen Again Button */}
          <button
            onClick={onListenAgain}
            className="flex items-center gap-2 text-lessongray-600 hover:text-lessongray-800 transition font-poppins text-sm sm:text-base"
          >
            <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />
            {t('conversation.listenAgain', 'Listen again')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationInput;
