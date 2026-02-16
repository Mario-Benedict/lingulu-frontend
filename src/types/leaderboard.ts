export type Leaderboard = {
  userId: string;
  username: string;
  totalPoints: number;
  avatarUrl: string;
}

export type UserRank = {
    userId: string;
    username: string;
    totalPoints: number;
    rank: number;
    avatarUrl: string;
}