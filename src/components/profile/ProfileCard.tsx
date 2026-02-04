import React from 'react';
import { PencilIcon, Camera, KeyRound } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

interface ProfileCardProps {
  avatarUrl: string;
  username: string;
  email: string;
  onChangeAvatar?: () => void;
  onChangePasswordClick?: () => void;
  onLogout?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  username,
  email,
  onChangeAvatar,
  onChangePasswordClick,
  onLogout,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-start justify-between gap-8">
        {/* Left Side - Avatar and Profile Info */}
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt={username}
              className="w-24 h-24 rounded-full border-4 border-primary"
            />
            {onChangeAvatar && (
              <button
                onClick={onChangeAvatar}
                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition"
              >
                <Camera size={16} />
              </button>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold text-lessongray-800 font-rubik">{username}</h2>
              {onChangeAvatar && (
                <button onClick={onChangeAvatar} className="w-10 h-10 flex items-center justify-center bg-primary rounded-full text-lessongray-100 hover:bg-primary/70 transition">
                  <PencilIcon size={24} />
                </button>
              )}
            </div>
            <p className="text-lessongray-600 text-lg font-poppins mt-2">{email}</p>
          </div>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex flex-col gap-3 min-w-max">
          {onChangePasswordClick && (
            <button
              onClick={onChangePasswordClick}
              className="px-6 py-2 border-2 border-primary text-primary hover:bg-lessongray-50 rounded-lg font-semibold font-poppins transition flex items-center gap-2"
            >
              <KeyRound size={18} />
              Change Password
            </button>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-6 py-2 bg-record-red hover:bg-record-red-dark text-white rounded-lg font-semibold font-poppins transition"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
