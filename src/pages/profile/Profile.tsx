import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@components/common/Sidebar';
import ProfileCard from '@components/profile/ProfileCard';
import StatsCard from '@components/profile/StatsCard';
import BioCard from '@components/profile/BioCard';
import { useAuth } from '@hooks/useAuth';
import { getCurrentUserProfile, uploadAvatar, updateUserBio, getLeaderboard } from '@api/services';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import type { Leaderboard, UserProfile, UserStats } from '@/types';

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBioModal, setShowBioModal] = useState<boolean>(false);
  const [bioText, setBioText] = useState<string>('');
  const [isBioSaving, setIsBioSaving] = useState<boolean>(false);
  const [displayAvatarUrl, setDisplayAvatarUrl] = useState<string>('/avatars/tiger-1.svg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        const [profileResponse, leaderboardResponse] = await Promise.all([
          getCurrentUserProfile(),
          getLeaderboard().catch(() => null)
        ]);
        
        const profileData = profileResponse.data;
        const leaderboardData = leaderboardResponse?.data || null;

        let userRank = 0;
        if (leaderboardData && profileData) {
          const currentUsername = profileData.username?.toLowerCase().trim();
          const foundIdx = leaderboardData.findIndex((item: Leaderboard) => 
            item.username.toLowerCase().trim() === currentUsername
          );
          
          if (foundIdx !== -1) userRank = foundIdx + 1;
        }

        if (profileData) {
          const avatarUrl = profileData.avatarUrl || '/avatars/tiger-1.svg';
          
          setProfile(profileData);
          setDisplayAvatarUrl(avatarUrl);

          setStats({
            streak: profileData.streak ?? 0,
            xp: profileData.totalPoints ?? 0,
            rank: userRank,
            completedLessons: profileData.completedSections ?? 0,
          });

        }
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const defaultProfile: UserProfile = {
    username: 'User',
    email: '',
    avatarUrl: '/avatars/tiger-1.svg',
    bio: 'No bio added yet',
    completedSections: 0,
    rank: 0,
    streak: 0,
    totalPoints: 0,
  };

  const defaultStats: UserStats = {
    streak: 0,
    xp: 0,
    rank: 0,
    completedLessons: 0,
  };

  const currentProfile = profile ?? defaultProfile;
  const currentStats = stats ?? defaultStats;

  const handleChangePasswordClick = () => {
    navigate('/change-password');
  };

  const handleChangeAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('File size must be less than 2MB');
      }

      const formData = new FormData();
      formData.append('avatarFile', file);

      const response = await uploadAvatar(formData);
      const avatarUrl = response.data?.avatarUrl || response.data?.avatarUrl;

      if (avatarUrl) {
        setProfile(prev => prev ? { ...prev, avatarUrl } : null);        
        setDisplayAvatarUrl(avatarUrl);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }        
      } else {
        throw new Error('No avatar URL in response - check console for response structure');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditBio = () => {
    setBioText(profile?.bio || '');
    setShowBioModal(true);
  };

  const handleSaveBio = async () => {
    if (!bioText.trim()) {
      alert('Bio cannot be empty');
      return;
    }
    
    try {
      setIsBioSaving(true);
      console.log('📝 Saving bio:', bioText);
      
      const response = await updateUserBio(bioText);
      console.log('✅ Bio saved response:', response);
      
      setProfile(prev => prev ? { ...prev, bio: bioText } : null);
      setShowBioModal(false);
      console.log('✅ Bio updated successfully');
    } catch (e) {
      console.error(e);
    } finally {
      setIsBioSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="hidden md:block">
        <Sidebar activeMenu="profile" />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 pt-[2.5rem]">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-7xl font-bold text-primary font-rubik">Profile</h2>
            <LanguageSwitcher/>
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <ProfileCard
                avatarUrl={displayAvatarUrl}
                username={currentProfile.username}
                email={currentProfile.email}
                onChangeAvatar={handleChangeAvatar}
                onChangePasswordClick={handleChangePasswordClick}
                onLogout={handleLogout}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <StatsCard stats={currentStats} />
                </div>

                <div className="lg:col-span-1">
                  <BioCard bio={currentProfile.bio} onEditBio={handleEditBio} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bio Edit Modal */}
      {showBioModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-primary font-rubik mb-4">Edit Bio</h3>
            <textarea
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="w-full h-32 p-3 border-2 border-lessongray-300 rounded-lg resize-none focus:border-primary focus:outline-none font-poppins"
              placeholder="Write something about yourself..."
              maxLength={200}
            />
            <p className="text-sm text-lessongray-500 mt-1">{bioText.length}/200</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowBioModal(false)}
                className="flex-1 px-4 py-2 border-2 border-lessongray-300 text-lessongray-600 rounded-lg font-semibold font-poppins hover:bg-lessongray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBio}
                disabled={isBioSaving}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold font-poppins hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isBioSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
