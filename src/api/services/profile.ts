import type { ApiResponse, UserProfile } from "@/types";
import { api } from "@api/axios";

export const getCurrentUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
    return await api.get("/account/profile");
}

export const uploadAvatar = async (file: File): Promise<ApiResponse<{ avatarUrl: string }>> => {
    const formData = new FormData();
    formData.append('avatarFile', file);
    return await api.post("/account/profile/avatar", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 60000
    });
}

export const updateUserBio = async (bio: string): Promise<ApiResponse<null>> => {
    return await api.post("/account/profile/bio", { bio });
};