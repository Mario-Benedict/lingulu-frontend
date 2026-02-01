import { api } from "@api/axios/index";

export const getAuthenticatedUser = async (): Promise<boolean> => {
    return await api.get("/api/account/authenticated");
}