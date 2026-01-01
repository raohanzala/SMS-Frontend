// src/api/auth.ts
import axiosInstance from "./axiosInstance";

export const signupApi = async (formData: FormData | { name: string; email: string; password: string; planId?: string }) => {
  // If it's FormData, use multipart/form-data, otherwise use JSON
  if (formData instanceof FormData) {
    const { data } = await axiosInstance.post("/auth/signup-owner", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } else {
    const { data } = await axiosInstance.post("/auth/signup-owner", formData);
    return data;
  }
};

export const signinApi = async (credentials: { email: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/signin", credentials);
  return data;
};

export const getProfileApi = async () => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};

export const updateProfileApi = async (formData: FormData) => {
  const { data } = await axiosInstance.put("/auth/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const changePasswordApi = async (payload: { currentPassword: string; newPassword: string }) => {
  const { data } = await axiosInstance.put("/auth/change-password", payload);
  return data;
};

export const setPasswordApi = async (payload: { token: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/set-password", payload);
  return data;
};