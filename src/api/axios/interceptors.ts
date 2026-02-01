import { api } from "./instance";
import { getToken, clearToken } from "@/utils/token";

export const setupInterceptors = () => {
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        clearToken();
      }
      return Promise.reject(error);
    }
  );
};
