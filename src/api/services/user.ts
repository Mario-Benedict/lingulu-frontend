import type { AuthStatusResponse } from "@/types";
import { api } from "@api/axios/index";

export const getAuthenticatedUser = async (): Promise<AuthStatusResponse> => {
    return await api.get("/api/account/authenticated");
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
    return await api.post("/api/otp/verify", { email, otp });
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