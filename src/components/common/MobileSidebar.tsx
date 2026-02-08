import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg';
import { Home, BookOpen, ChartColumn, BotMessageSquare, User } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu?: string;
}

const menuItems = [
  { id: 'dashboard', labelKey: 'sidebar.dashboard', icon: Home, to: '/dashboard' },
  { id: 'lessons', labelKey: 'sidebar.lessons', icon: BookOpen, to: '/lessons' },
  { id: 'leaderboard', labelKey: 'sidebar.leaderboard', icon: ChartColumn, to: '/leaderboard' },
  { id: 'conversation', labelKey: 'sidebar.conversation', icon: BotMessageSquare, to: '/conversation' },
  { id: 'profile', labelKey: 'sidebar.profile', icon: User, to: '/profile' },
] as const;

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, activeMenu = '' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />

      {/* Sidebar drawer */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 md:hidden animate-slide-in-left">
        <aside className="bg-white shadow-2xl h-screen flex flex-col w-64">
          {/* Header with close button and logo */}
          <div className="py-2 border-b flex items-center justify-between px-3">
            <button
              onClick={onClose}
              className="p-2 ml-2 bg-primary hover:bg-red-100 rounded-full transition-all duration-200 shadow-sm border border-gray-200 hover:border-red-200 group"
              aria-label="Close menu"
            >
              <X size={18} className="text-white group-hover:text-red-500 transition-colors" />
            </button>
            <img src={sidebarLogo} alt="Lingulu Logo" className="h-14" />
            {/* Spacer for centering */}
            <div className="w-[42px]"></div>
          </div>
          
          <nav className="pt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <div className="w-full" key={item.id}>
                  <button
                    onClick={() => {
                      navigate(item.to);
                      onClose();
                    }}
                    className={`w-full px-6 py-3 flex items-center gap-3 transition-colors ${
                      isActive
                        ? 'bg-primary text-white border-r-4 border-primary-dark'
                        : 'text-lessongray-600 hover:bg-lessongray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-large font-rubik">{t(item.labelKey)}</span>
                  </button>
                </div>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default MobileSidebar;
