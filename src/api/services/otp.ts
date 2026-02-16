import { api } from "@api/axios";

export const requestOtp = async (email: string): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/otp/request", { email });
}

export const verifyOtp = async (email: string, otp: string): Promise<{ success: boolean; message: string }> => {
    return await api.post("/api/otp/verify", { 
        email, 
        otp 
    });
}