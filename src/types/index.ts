export * from './profile';
export * from './leaderboard';
export * from './course';
export * from './progress';
export * from './auth';
export * from './general';
export * from './dashboard';

export interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
};