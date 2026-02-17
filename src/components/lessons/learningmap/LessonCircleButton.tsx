import React from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import type { LessonStatus } from '@/types';

type LessonCircleButtonProps = {
  status: LessonStatus;
  lessonId: number;
  onClick?: () => void;
  disabled?: boolean;
}

const getStatusColor = (status: LessonStatus) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-lesson-green border-8 hover:shadow-lesson-green-dark';
    case 'IN_PROGRESS':
      return 'bg-primary border-8 hover:shadow-orange-700';
    case 'NOT_STARTED':
      return 'bg-lesson-gray border-8 hover:shadow-lesson-gray-dark';
    default:
      return 'bg-blue-500';
  }
};

const LessonCircleButton: React.FC<LessonCircleButtonProps> = ({ status, lessonId, onClick, disabled }) => {
  const renderIcon = () => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={30} className="text-white" />;
      case 'IN_PROGRESS':
        return <span className="text-white font-bold text-3xl">{lessonId}</span>;
      case 'NOT_STARTED':
        return <Lock size={30} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 hover:shadow-2xl border-lessongray-100 border-b-12 sm:-translate-x-4 ${getStatusColor(
        status
      )} ${status === 'NOT_STARTED' || disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={status === 'NOT_STARTED' || disabled}
    >
      {renderIcon()}
    </button>
  );
};

export default LessonCircleButton;
