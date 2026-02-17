import type { ApiResponse, Dashboard } from "@/types";
import { api } from "@api/axios";

export const getDashboard = async (): Promise<ApiResponse<Dashboard>> => {
    return await api.get("/dashboard");
}