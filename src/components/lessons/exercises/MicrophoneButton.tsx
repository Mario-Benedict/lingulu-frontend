import { Mic } from 'lucide-react';

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ isListening, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center border-b border-b-lessongray-400 pb-6">
      <button
        onClick={onClick}
        className={`w-32 h-32 rounded-full flex items-center justify-center transition shadow-lg hover:shadow-xl ${
          isListening
            ? 'bg-record-red text-white hover:bg-record-red-dark animate-pulse'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        <Mic size={64} />
      </button>
      <p className="mt-8 text-lessongray-600 font-poppins">
        {isListening ? 'Listening...' : 'Tap the microphone to answer'}
      </p>
    </div>
  );
};

export default MicrophoneButton;
