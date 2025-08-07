// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { signup, signin, getProfile, updateProfile, changePassword } from "../api/auth";

// 🔑 Query Key
const PROFILE_KEY = ["profile"];

// ✅ Signup
export const useSignup = () => {
  return useMutation(signup);
};

// ✅ Signin
export const useSignin = () => {
  return useMutation(signin);
};

// ✅ Get Profile
export const useProfile = () => {
  return useQuery(PROFILE_KEY, getProfile);
};

// ✅ Update Profile
export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: () => qc.invalidateQueries(PROFILE_KEY),
  });
};

// ✅ Change Password
export const useChangePassword = () => {
  return useMutation(changePassword);
};
