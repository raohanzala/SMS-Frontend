// src/api/auth.js
import axiosInstance from "./axiosInstance";

// ✅ Signup (with profile image)
export const signup = async (formData) => {
  const { data } = await axiosInstance.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Signin
export const signin = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/signin", credentials);
  return data;
};

// ✅ Get Profile
export const getProfile = async () => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};

// ✅ Update Profile (with image)
export const updateProfile = async (formData) => {
  const { data } = await axiosInstance.put("/auth/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Change Password
export const changePassword = async (payload) => {
  const { data } = await axiosInstance.put("/auth/change-password", payload);
  return data;
};
