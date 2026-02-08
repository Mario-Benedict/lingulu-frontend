import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@components/common/PageLayout';
import ProfileCard from '@components/profile/ProfileCard';
import StatsCard from '@components/profile/StatsCard';
import BioCard from '@components/profile/BioCard';
import LanguageSwitcher from '@components/common/LanguageSwitcher';
import { useAuth } from '@hooks/useAuth';

// Types khusus untuk Profile page
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
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
        const token = localStorage.getItem('token');
        const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

        // Fetch user profile
        const profileRes = await fetch(`${API_BASE}/api/account/profile`, { headers });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData?.success && profileData?.data) {
            setProfile({
              username: profileData.data.username ?? 'User',
              email: profileData.data.email ?? '',
              avatarUrl: profileData.data.profileUrl ?? '/avatars/tiger-1.svg',
              bio: profileData.data.bio ?? 'No bio added yet',
            });
          }
        }

        // Fetch user stats
        const statsRes = await fetch(`${API_BASE}/api/account/stats`, { headers });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData?.success && statsData?.data) {
            setStats({
              streak: statsData.data.streak ?? 0,
              xp: statsData.data.totalPoints ?? statsData.data.xp ?? 0,
              rank: statsData.data.rank ?? 0,
              completedLessons: statsData.data.completedLessons ?? 0,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Default values jika data belum ada
  const defaultProfile: UserProfile = {
    username: 'Nicko',
    email: 'Nicko.richardo@gmail.com',
    avatarUrl: '/avatars/tiger-1.svg',
    bio: 'Halo saya nicko bla blaaksaskdasdjaksdjaksdasjdkasdjsadjkasdjasdkasdjksa',
  };

  const defaultStats: UserStats = {
    streak: 10,
    xp: 2500,
    rank: 5,
    completedLessons: 31,
  };

  const currentProfile = profile ?? defaultProfile;
  const currentStats = stats ?? defaultStats;

  const handleAccountClick = () => {
    // TODO: Navigate to account settings page
    console.log('Account clicked');
  };

  const handleChangePasswordClick = () => {
    navigate('/change-password');
  };

  const handleChangeAvatar = () => {
    // TODO: Open avatar picker modal
    console.log('Change avatar clicked');
  };

  const handleEditBio = () => {
    // TODO: Open bio editor modal
    console.log('Edit bio clicked');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <PageLayout
      activeMenu="profile"
      title={t('profile.title')}
      rightElement={<LanguageSwitcher />}
    >
      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Profile Card - Full Width */}
            <ProfileCard
              avatarUrl={currentProfile.avatarUrl}
              username={currentProfile.username}
              email={currentProfile.email}
              onChangeAvatar={handleChangeAvatar}
              onChangePasswordClick={handleChangePasswordClick}
              onLogout={handleLogout}
            />

            {/* Stats & Bio Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
    </PageLayout>
  );
};

export default Profile;