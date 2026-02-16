import type { AuthStatusResponse } from "@/types";
import { api } from "@api/axios";

export const getAuthenticatedUser = async (): Promise<AuthStatusResponse> => {
    return await api.get("/account/authenticated");
}

export const loginUser = async (data: {
    email: string;
    password: string;
    isRememberMe: boolean;
}): Promise<AuthStatusResponse> => {
    return await api.post("/account/login", data);
}

export const registerUser = async (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}): Promise<AuthStatusResponse> => {
    return await api.post("/account/register", data);
}

export const logoutUser = async (): Promise<AuthStatusResponse> => {
    return await api.post("/account/logout");
}