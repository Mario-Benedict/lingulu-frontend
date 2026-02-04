import { Mic, Volume2 } from 'lucide-react';

interface ConversationInputProps {
  isRecording: boolean;
  onTapToSpeak: () => void;
  onListenAgain: () => void;
}

const ConversationInput: React.FC<ConversationInputProps> = ({
  isRecording,
  onTapToSpeak,
  onListenAgain,
}) => {
  return (
    <div className="bg-white px-8 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-lessongray-300"></div>
        </div>

        {/* Tap to Speak Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onTapToSpeak}
            className={`w-full py-4 rounded-full font-semibold font-poppins text-lg transition flex items-center justify-center gap-2 ${
              isRecording
                ? 'bg-record-red hover:bg-record-red-dark text-white'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            <Mic size={24} />
            {isRecording ? 'RECORDING...' : 'TAP TO SPEAK'}
          </button>

          {/* Listen Again Button */}
          <button
            onClick={onListenAgain}
            className="flex items-center gap-2 text-lessongray-600 hover:text-lessongray-800 transition font-poppins"
          >
            <Volume2 size={18} />
            Listen again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationInput;
