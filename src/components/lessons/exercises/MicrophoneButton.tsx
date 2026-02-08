import { Mic } from 'lucide-react';

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ isListening, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center border-b border-b-lessongray-400 pb-4 sm:pb-6">
      <button
        onClick={onClick}
        className={`w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition shadow-lg hover:shadow-xl ${
          isListening
            ? 'bg-record-red text-white hover:bg-record-red-dark animate-pulse'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        <Mic className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" />
      </button>
      <p className="mt-4 sm:mt-6 md:mt-8 text-lessongray-600 font-poppins text-sm sm:text-base">
        {isListening ? 'Listening...' : 'Tap the microphone to answer'}
      </p>
    </div>
  );
};

export default MicrophoneButton;
