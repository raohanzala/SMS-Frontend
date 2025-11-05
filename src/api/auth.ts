// src/api/auth.js
import axiosInstance from "./axiosInstance";

export const signupApi = async (formData) => {
  const { data } = await axiosInstance.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const signinApi = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/signin", credentials);
  return data;
};

export const getProfileApi = async () => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};

export const updateProfileApi = async (formData) => {
  const { data } = await axiosInstance.put("/auth/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const changePasswordApi = async (payload) => {
  const { data } = await axiosInstance.put("/auth/change-password", payload);
  return data;
};
