export * from './profile';
export * from './leaderboard';
export * from './course';
export interface ApiResponse<T> {
  success: boolean,
  message: string,
  data?: T
}

export type AuthStatusResponse = ApiResponse<{ authenticated: boolean }>;

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
  isComingSoon?: boolean;
  buttonText: string;
  buttonColor: string;
  lockMessage?: string;
  mascotImage: string;
  progress?: number;
  onStart?: () => void;
}

export interface Lesson {
  id: number;
  lessonUuid: string;
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