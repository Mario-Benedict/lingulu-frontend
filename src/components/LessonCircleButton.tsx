import React from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { LessonCircleButtonProps } from '../types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-lesson-green border-8 hover:shadow-lesson-green-dark';
    case 'in-progress':
      return 'bg-orange-500 border-8 hover:shadow-orange-700';
    case 'locked':
      return 'bg-lesson-gray border-8 hover:shadow-lesson-gray-dark';
    default:
      return 'bg-blue-500';
  }
};

const LessonCircleButton: React.FC<LessonCircleButtonProps> = ({ status, lessonId, onClick, disabled }) => {
  const renderIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={40} className="text-white" />;
      case 'in-progress':
        return <span className="text-white font-bold text-3xl">{lessonId}</span>;
      case 'locked':
        return <Lock size={40} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 hover:shadow-2xl border-lessongray-100 border-b-12 transform -translate-x-4 ${getStatusColor(
        status
      )} ${status === 'locked' || disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={status === 'locked' || disabled}
    >
      {renderIcon()}
    </button>
  );
};

export default LessonCircleButton;
