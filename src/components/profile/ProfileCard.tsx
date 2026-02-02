import React from 'react';
import ProfileAvatar from './ProfileAvatar';

interface ProfileCardProps {
  avatarUrl: string;
  username: string;
  email: string;
  onChangeAvatar?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ avatarUrl, username, email, onChangeAvatar }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
      <ProfileAvatar
        avatarUrl={avatarUrl}
        username={username}
        size="md"
        onChangeAvatar={onChangeAvatar}
        editable={!!onChangeAvatar}
      />
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 font-rubik">{username}</h2>
        <p className="text-primary text-lg">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
