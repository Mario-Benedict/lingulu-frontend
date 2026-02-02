import React from 'react';
import { Camera } from 'lucide-react';

interface ProfileAvatarProps {
  avatarUrl: string;
  username: string;
  size?: 'sm' | 'md' | 'lg';
  onChangeAvatar?: () => void;
  editable?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const cameraSizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const cameraIconSizes = {
  sm: 12,
  md: 16,
  lg: 20,
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  username,
  size = 'md',
  onChangeAvatar,
  editable = true,
}) => {
  return (
    <div className="relative inline-block">
      {/* Avatar Image */}
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-primary`}
      >
        <img
          src={avatarUrl}   
          alt={username}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Camera Icon Button */}
      {editable && (
        <button
          onClick={onChangeAvatar}
          className={`absolute bottom-0 right-0 ${cameraSizeClasses[size]} bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer`}
          aria-label="Change avatar"
        >
          <Camera className="text-white" size={cameraIconSizes[size]} />
        </button>
      )}
    </div>
  );
};

export default ProfileAvatar;
