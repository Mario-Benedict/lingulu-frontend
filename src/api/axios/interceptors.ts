import { api } from "./instance";

export const setupInterceptors = () => {
  api.interceptors.request.use((config) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath.startsWith('/login') || currentPath.startsWith('/register') || currentPath.startsWith('/otp-verify');
      
      if (error.response?.status === 401 && !isAuthPage) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

