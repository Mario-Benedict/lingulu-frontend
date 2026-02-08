import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import MobileHeader from './MobileHeader';

interface PageLayoutProps {
  children: React.ReactNode;
  activeMenu: string;
  title?: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  headerClassName?: string;
  showHeader?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  activeMenu,
  title = '',
  subtitle,
  rightElement,
  headerClassName,
  showHeader = true,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Desktop sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar activeMenu={activeMenu} />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu={activeMenu}
      />

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto flex flex-col min-w-0 ${className}`}>
        {showHeader && (
          <MobileHeader
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setMobileMenuOpen(true)}
            rightElement={rightElement}
            className={headerClassName}
          />
        )}
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
