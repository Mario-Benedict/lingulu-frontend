import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sidebarLogo from '@assets/dashboard/sidebar-logo.svg';
import { Home, BookOpen, ChartColumn, BotMessageSquare, User } from 'lucide-react';

interface SidebarProps {
  activeMenu?: string;
  onClose?: () => void;
  className?: string;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, to: '/dashboard' },
  { id: 'lessons', label: 'Lessons', icon: BookOpen, to: '/lessons' },
  { id: 'leaderboard', label: 'Leaderboard', icon: ChartColumn, to: '/leaderboard' },
  { id: 'conversation', label: 'AI Conversation', icon: BotMessageSquare, to: '/conversation' },
  { id: 'profile', label: 'Profile', icon: User, to: '/profile' },
] as const;

const Sidebar: React.FC<SidebarProps> = ({ activeMenu: initialActiveMenu = '', onClose, className }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>(initialActiveMenu);

  return (
      <aside className={`bg-white shadow-2xl h-screen flex flex-col ${className ?? 'w-64'}`}>
        <div className="py-2 border-b">
          <img src={sidebarLogo} alt="Lingulu Logo" className="h-16 mx-auto" />
        </div>
        <nav className="pt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <div className="w-full">
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    navigate(item.to);
                    onClose?.();
                  }}
                  className={`w-full px-6 py-3 flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-primary text-white border-r-4 border-primary-dark'
                      : 'text-lessongray-600 hover:bg-lessongray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-large font-rubik">{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </aside>
  );
};

export default Sidebar;
