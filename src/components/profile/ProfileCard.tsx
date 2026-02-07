import React, { useState } from 'react';
import { Camera, KeyRound } from 'lucide-react';
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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const loadTimeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    console.log('📸 ProfileCard mounted with avatarUrl:', avatarUrl);
    
    // 3 second timeout untuk CloudFront
    loadTimeoutRef.current = setTimeout(() => {
      if (imageLoading) {
        console.error('⏱️ Avatar timeout after 3s - CloudFront unreachable');
        console.error('URL:', avatarUrl);
        setImageError('Timeout');
        setImageLoading(false);
      }
    }, 3000);

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [avatarUrl, imageLoading]);

  const handleImageError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = error.target as HTMLImageElement;
    console.error('❌ Avatar image failed to load');
    console.error('URL:', avatarUrl);
    console.error('Error event:', error.type);
    
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setImageError('Failed');
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('✅ Avatar loaded successfully from:', avatarUrl);
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setImageLoading(false);
    setImageError(null);
  };

  // Generate initials dari username
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-start justify-between gap-8">
        {/* Left Side - Avatar and Profile Info */}
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            {imageError ? (
              <div className="w-24 h-24 rounded-full border-4 border-primary bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <span className="text-white font-bold text-2xl font-rubik">
                  {getInitials(username)}
                </span>
              </div>
            ) : imageLoading ? (
              <div className="w-24 h-24 rounded-full border-4 border-primary bg-lessongray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              </div>
            ) : (
              <img
                src={avatarUrl}
                alt={username}
                className="w-24 h-24 rounded-full border-4 border-primary object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
                referrerPolicy="no-referrer"
              />
            )}
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
            <h2 className="text-4xl font-bold text-lessongray-800 font-rubik">{username}</h2>
            <p className="text-lessongray-600 text-lg font-poppins mt-2">{email}</p>
            {imageError && (
              <div className="mt-2">
                <p className="text-sm text-lessongray-600">Avatar: {imageError}</p>
                <p className="text-xs text-lessongray-500">Showing initials</p>
              </div>
            )}
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
