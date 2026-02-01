import { api } from "./instance";

export const setupInterceptors = () => {
  api.interceptors.request.use((config) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};
