// API response type for leaderboard
export interface LeaderboardApiUser {
  user?: {
    username?: string;
    userId?: string;
  };
  totalPoints?: number;
  profileUrl?: string;
  porfileUrl?: string; // typo di backend, tetap di-handle
}
// Centralized TypeScript types and interfaces for Lingulu Frontend

export interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export interface LeaderboardEntry {
  name: string;
  xp: number;
  avatarUrl?: string;
  userId?: string;
  rank: number;
}

export interface LessonLevelCardProps {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  isLocked: boolean;
  buttonText: string;
  buttonColor: string;
  lockMessage?: string;
  mascotImage: string;
  progress?: number;
  onStart?: () => void;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
}

export interface LessonCircleButtonProps {
  status: 'completed' | 'in-progress' | 'locked';
  lessonId: number;
  onClick?: () => void;
  disabled?: boolean;
}
