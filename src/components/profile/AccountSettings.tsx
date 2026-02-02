import React from 'react';
import { User, KeyRound } from 'lucide-react';

interface SettingItemProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg border-b border-b-gray-400"
    >
      <div className="text-gray-500">
        {icon}
      </div>
      <span className="text-gray-700 font-medium">{label}</span>
    </button>

  );
};

interface AccountSettingsProps {
  onAccountClick?: () => void;
  onChangePasswordClick?: () => void;
  onLogout: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  onAccountClick,
  onChangePasswordClick,
  onLogout,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-primary font-rubik mb-4">Account Setting</h3>
      
      <div className="flex flex-col gap-1">
        <SettingItem label="Account" icon={<User size={20} />} onClick={onAccountClick} />
        <SettingItem label="Change Password" icon={<KeyRound size={20} />} onClick={onChangePasswordClick} />
      </div>
      
      <button
        onClick={onLogout}
        className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};

export default AccountSettings;
