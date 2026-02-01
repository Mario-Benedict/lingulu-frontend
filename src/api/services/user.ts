import { api } from "@api/axios";

export const getAuthenticatedUser = async (): Promise<boolean> => {
    return await api.get("/api/user/authenticated");
}