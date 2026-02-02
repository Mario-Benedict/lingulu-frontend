import React from 'react';

interface StatItemProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  iconBgColor?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, iconBgColor }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
      {icon && (
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor ?? 'bg-primary'}`}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-800 font-rubik">
          {value} {!icon && label}
        </span>
        {icon && <span className="text-gray-500 text-sm">{label}</span>}
      </div>
    </div>
  );
};

export default StatItem;
