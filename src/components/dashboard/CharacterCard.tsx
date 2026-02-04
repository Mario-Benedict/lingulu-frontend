import React from 'react';
import { useNavigate } from 'react-router-dom';
import startConvo from '@assets/dashboard/start-convo.svg';

const CharacterCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-center flex flex-col items-center gap-6 h-full font-poppins">
      <div className="w-48 h-48 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center mt-4">
        <img src={startConvo} alt="AI Tutor Character" className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="text-2xl font-semibold text-gray-700 bg-gray-300 p-4 mt-4 rounded-lg">
        Ready to practice? <br /> Let's talk!
      </div>
      <button 
        onClick={() => navigate('/conversation')}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition mt-auto shadow-lg"
      >
        Start Conversation
      </button>
    </div>
  );
};

export default CharacterCard;
