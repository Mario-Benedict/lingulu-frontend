import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, KeyRound } from 'lucide-react';

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
  const { t } = useTranslation();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {    
    const initialStateTimer = setTimeout(() => {
      setImageLoading(true);
      setImageError(null);
    }, 0);
    
    loadTimeoutRef.current = setTimeout(() => {
      setImageError('Timeout');
      setImageLoading(false);
    }, 3000);

    return () => {
      clearTimeout(initialStateTimer);
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [avatarUrl]);

  const handleImageError = () => {    
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setImageError('Failed');
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    setImageLoading(false);
    setImageError(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="relative flex-shrink-0">
            {imageLoading ? (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary bg-lessongray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              </div>
            ) : (
              <img
                src={avatarUrl}
                alt={username}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary object-cover shadow-[0_4px_10px_rgba(0,0,0,0.15)] bg-white"
                onError={handleImageError}
                onLoad={handleImageLoad}
                referrerPolicy="no-referrer"
              />
            )}
            {onChangeAvatar && (
              <button
                onClick={onChangeAvatar}
                className="absolute bottom-0 right-0 bg-primary text-white p-1.5 sm:p-2 rounded-full hover:bg-primary/90 transition"
              >
                <Camera size={14} className="sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-lessongray-800 font-rubik">{username}</h2>
            <p className="text-lessongray-600 text-base sm:text-lg font-poppins mt-1 sm:mt-2">{email}</p>
            {imageError && (
              <div className="mt-2">
                <p className="text-sm text-lessongray-600">Avatar: {imageError}</p>
                <p className="text-xs text-lessongray-500">Showing initials</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 w-full sm:w-auto sm:min-w-max">
          {onChangePasswordClick && (
            <button
              onClick={onChangePasswordClick}
              className="flex-1 sm:flex-none px-3 sm:px-6 py-2 border-2 border-primary text-primary hover:bg-lessongray-50 rounded-lg font-semibold font-poppins transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <KeyRound size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden xs:inline">{t('profile.changePassword')}</span>
              <span className="xs:hidden">Change Password</span>
            </button>
          )}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-none px-3 sm:px-6 py-2 bg-record-red hover:bg-record-red-dark text-white rounded-lg font-semibold font-poppins transition text-sm sm:text-base"
            >
              {t('profile.logout')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
