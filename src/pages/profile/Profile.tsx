import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@components/common/Sidebar';
import ProfileCard from '@components/profile/ProfileCard';
import StatsCard from '@components/profile/StatsCard';
import BioCard from '@components/profile/BioCard';
import { useAuth } from '@hooks/useAuth';
import { getCurrentUserProfile, uploadAvatar, updateUserBio, getLeaderboard } from '@api/services/user';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
}

interface UserStats {
  streak: number;
  xp: number;
  rank: number;
  completedLessons: number;
}

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBioModal, setShowBioModal] = useState(false);
  const [bioText, setBioText] = useState('');
  const [isBioSaving, setIsBioSaving] = useState(false);
  const [displayAvatarUrl, setDisplayAvatarUrl] = useState<string>('/avatars/tiger-1.svg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // Fetch profile dan leaderboard untuk mendapatkan rank dengan tie-breaker
        const [profileResponse, leaderboardResponse] = await Promise.all([
          getCurrentUserProfile(),
          getLeaderboard().catch(() => null)
        ]);
        
        const data = profileResponse.data;
        console.log('✅ Profile Response:', data);
        console.log('📊 Profile Response Keys:', Object.keys(data || {}));
        console.log('📈 Available fields:', {
          userName: data?.userName,
          email: data?.email,
          avatarUrl: data?.avatarUrl,
          bio: data?.bio,
          streak: data?.streak,
          totalPoints: data?.totalPoints,
          completedSections: data?.completedSections,
          completedLessons: data?.completedLessons,
          allFields: JSON.stringify(data, null, 2)
        });
        
        // Check raw response structure
        console.log('🔍 Full profileResponse object:', profileResponse);
        console.log('🔍 profileResponse.data:', profileResponse?.data);
        console.log('🔍 Is profileResponse directly the data?', profileResponse?.completedSections);

        // Calculate rank from leaderboard data (already sorted by backend with tie-breaker)
        let userRank = 0;
        if (leaderboardResponse && data) {
          const rawData = leaderboardResponse.data?.data || leaderboardResponse.data;
          const leaderboardData = Array.isArray(rawData) ? rawData : [];
          
          // Find current user's position in leaderboard (already sorted by totalPoints, then by earliest time)
          const currentUsername = data.userName?.toLowerCase().trim();
          const foundIdx = leaderboardData.findIndex((item: any) => 
            (item.username || item.name || '').toLowerCase().trim() === currentUsername
          );
          
          if (foundIdx !== -1) {
            userRank = foundIdx + 1;
          }
          console.log('✅ User Rank from Leaderboard:', userRank);
        }

        if (data) {
          // Use avatarUrl directly like Leaderboard (presigned S3 URL from backend)
          const avatarUrl = data.avatarUrl || '/avatars/tiger-1.svg';
          
          setProfile({
            username: data.userName ?? 'User',
            email: data.email ?? '',
            avatarUrl: avatarUrl,
            bio: data.bio ?? 'No bio added yet',
          });

          // Display avatar URL directly (backend returns presigned S3 URL)
          setDisplayAvatarUrl(avatarUrl);

          setStats({
            streak: data.streak ?? 0,
            xp: data.totalPoints ?? 0,
            rank: userRank,
            completedLessons: data.completedSections ?? 0,
          });
          
          console.log('✅ Stats Set:', {
            streak: data.streak ?? 0,
            xp: data.totalPoints ?? 0,
            rank: userRank,
            completedLessons: data.completedSections ?? 0,
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
      console.log('📤 Uploading avatar:', file.name, 'Size:', `${(file.size / 1024 / 1024).toFixed(2)}MB`, 'Type:', file.type);
      
      // Validate file size
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('File size must be less than 2MB');
      }

      const response = await uploadAvatar(file);
      console.log('✅ Full upload response:', JSON.stringify(response, null, 2));
      
      // Debug: Check what structure we actually got
      console.log('Response properties:', {
        hasData: !!response.data,
        dataKeys: response.data ? Object.keys(response.data) : [],
        hasAvatarUrl: !!response.avatarUrl,
        hasDataAvatarUrl: !!response.data?.avatarUrl,
        responseKeys: Object.keys(response),
      });
      
      // Response format after interceptor returns response.data
      // Backend returns: { success, message, data: { avatarUrl, ... } }
      // So response = { success, message, data: { avatarUrl, ... } }
      const avatarUrl = response.data?.avatarUrl || response.avatarUrl;
      console.log('🖼️ Extracted Avatar URL:', avatarUrl);
      console.log('📊 Profile state before update:', profile);
      
      if (avatarUrl) {
        console.log('🔄 Updating profile with new avatar URL:', avatarUrl);
        setProfile(prev => {
          const updated = prev ? { ...prev, avatarUrl } : null;
          console.log('📊 Updated profile:', updated);
          return updated;
        });
        
        // Display avatar URL directly (presigned S3 URL from backend)
        console.log('🎨 Setting display avatar URL:', avatarUrl);
        setDisplayAvatarUrl(avatarUrl);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        console.log('✅ Avatar updated in profile state');
      } else {
        throw new Error('No avatar URL in response - check console for response structure');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      console.error('❌ Failed to upload avatar:', errorMsg);
      alert(`Failed to upload avatar: ${errorMsg}`);
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
      
      // Update local state
      setProfile(prev => prev ? { ...prev, bio: bioText } : null);
      setShowBioModal(false);
      console.log('✅ Bio updated successfully');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      console.error('❌ Failed to save bio:', errorMsg);
      alert(`Failed to save bio: ${errorMsg}`);
    } finally {
      setIsBioSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Hidden file input for avatar upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar activeMenu="profile" />
      </div>

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 pt-[2.5rem]">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-7xl font-bold text-primary font-rubik">Profile</h2>
            <LanguageSwitcher/>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile Card - Full Width */}
              <ProfileCard
                avatarUrl={displayAvatarUrl}
                username={currentProfile.username}
                email={currentProfile.email}
                onChangeAvatar={handleChangeAvatar}
                onChangePasswordClick={handleChangePasswordClick}
                onLogout={handleLogout}
              />

              {/* Stats & Bio Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Card */}
                <div className="lg:col-span-2">
                  <StatsCard stats={currentStats} />
                </div>

                {/* Bio Card */}
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
