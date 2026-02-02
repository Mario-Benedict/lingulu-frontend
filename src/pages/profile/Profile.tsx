import React, { useEffect, useState } from 'react';
import Sidebar from '@components/common/Sidebar';
import ProfileCard from '@components/profile/ProfileCard';
import StatsCard from '@components/profile/StatsCard';
import AccountSettings from '@components/profile/AccountSettings';
import { useAuth } from '@hooks/useAuth';

// Types khusus untuk Profile page
interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
}

interface UserStats {
  streak: number;
  xp: number;
  rank: number;
  completedLessons: number;
}

const Profile: React.FC = () => {
  const { logout } = useAuth();
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
    // TODO: Navigate to change password page
    console.log('Change password clicked');
  };

  const handleChangeAvatar = () => {
    // TODO: Open avatar picker modal
    console.log('Change avatar clicked');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar activeMenu="profile" />
      </div>

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 pt-[2.5rem]">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-7xl font-bold text-primary font-rubik">Profil</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile & Stats */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Profile Card */}
                <ProfileCard
                  avatarUrl={currentProfile.avatarUrl}
                  username={currentProfile.username}
                  email={currentProfile.email}
                  onChangeAvatar={handleChangeAvatar}
                />

                {/* Stats Card */}
                <StatsCard stats={currentStats} />
              </div>

              {/* Right Column - Account Settings */}
              <div className="lg:col-span-1">
                <AccountSettings
                  onAccountClick={handleAccountClick}
                  onChangePasswordClick={handleChangePasswordClick}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
