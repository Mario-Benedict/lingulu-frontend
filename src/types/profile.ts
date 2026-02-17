export type UserProfile = {
  username: string;
  avatarUrl: string;
  email: string;
  bio: string;
  completedSections: number;
  rank: number;
  streak: number;
  totalPoints: number;
};

export type UserStats = {
  streak: number;
  xp: number;
  rank: number;
  completedLessons: number;
};