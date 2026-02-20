import { api } from "./instance";

export const setupInterceptors = () => {
  const publicEndpoints = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/otp-verify",
    "/oauth2/success"
  ]  

  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const currentPath = window.location.pathname;
      
      if (error.response?.status === 401 && !publicEndpoints.some(endpoint => currentPath.startsWith(endpoint))) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

