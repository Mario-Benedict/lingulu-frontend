import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  rightElement?: React.ReactNode;
  className?: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  subtitle,
  onMenuClick,
  rightElement,
  className = '',
}) => {
  return (
    <div className={`bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Left: Menu button (mobile) + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-primary" />
          </button>
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary font-rubik leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm md:text-base text-lessongray-500 font-rubik">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right element (optional) */}
        {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
      </div>
    </div>
  );
};

export default MobileHeader;
