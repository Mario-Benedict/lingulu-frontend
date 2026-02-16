import { api } from "@api/axios";

export const getDashboard = async (): Promise<any> => {
    return await api.get("/dashboard");
}