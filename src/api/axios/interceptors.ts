import { api } from "./instance";

export const setupInterceptors = () => {
  api.interceptors.request.use((config) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Jangan redirect ke login jika sudah di halaman login/register
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath.includes('/login') || currentPath.includes('/register') || currentPath.includes('/otp');
      
      if (error.response?.status === 401 && !isAuthPage) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

