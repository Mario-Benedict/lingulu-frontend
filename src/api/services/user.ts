import type { AuthStatusResponse } from "@/types";
import { api } from "@api/axios/index";

export const getAuthenticatedUser = async (): Promise<AuthStatusResponse> => {
    return await api.get("/api/account/authenticated");
}

// Get Current User Profile Data
export const getCurrentUserProfile = async (): Promise<any> => {
    return await api.get("/api/account/profile");
}

// Get Current User Rank
export const getUserRank = async (): Promise<any> => {
    return await api.get("/api/leaderboard/user-rank");
}

// Get Full Leaderboard (for tie-breaker sorting)
export const getLeaderboard = async (): Promise<any> => {
    return await api.get("/api/leaderboard/all");
}

// Login Service
export const loginUser = async (data: {
    email: string;
    password: string;
    isRememberMe: boolean;
}): Promise<AuthStatusResponse> => {
    return await api.post("/api/account/login", data);
}

// OTP Services
export const requestOtp = async (email: string): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/otp/request", { email });
}

export const verifyOtp = async (email: string, otp: string): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/otp/verify", { 
        email, 
        otp 
    });
}

// Register Service
export const registerUser = async (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}): Promise<AuthStatusResponse> => {
    return await api.post("/api/account/register", data);
}

// Reset Password Services
export const sendResetPasswordEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/account/send-reset-password", { email });
}

export const resetPassword = async (data: {
    email: string;
    newPassword: string;
    confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/account/reset-password", data);
}

// Dashboard Service
export const getDashboard = async (): Promise<any> => {
    return await api.get("/api/dashboard");
}