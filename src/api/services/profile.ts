import type { ApiResponse, UserProfile } from "@/types";
import { api } from "@api/axios";

export const getCurrentUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
    return await api.get("/account/profile");
}

export const uploadAvatar = async (formData: FormData): Promise<ApiResponse<{ avatarUrl: string }>> => {
    return await api.patch("/account/profile/update-avatar", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 60000
    });
}

export const updateUserBio = async (bio: string): Promise<ApiResponse<null>> => {
    return await api.patch("/account/profile/update-bio", { bio });
};