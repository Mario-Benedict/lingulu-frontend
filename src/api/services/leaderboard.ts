import type { ApiResponse, Leaderboard, UserRank } from "@/types";
import { api } from "@api/axios";

export const getLeaderboard = async (): Promise<ApiResponse<Array<Leaderboard>>> => {
    return await api.get("/api/leaderboard/all");
}

export const getUserRank = async (): Promise<ApiResponse<UserRank>> => {
    return await api.get("/api/leaderboard/user-rank");
}