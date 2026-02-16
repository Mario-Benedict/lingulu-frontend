import { api } from "@api/axios";

export const resetPassword = async (data: {
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  return await api.post("/account/reset-password", data);
};

export const forgotPassword = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  return await api.post("/account/forgot-password", { email });
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  return await api.post("/account/change-password", data);
};