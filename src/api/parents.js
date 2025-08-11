// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getAllParents = async (params = {}) => {
  const { data } = await axiosInstance.get("/parents", params);
  return data;
};

export const getParentById = async (id) => {
  const { data } = await axiosInstance.get(`/parents/${id}`);
  return data;
};

// ✅ Add new student (with image upload)
export const createParent = async (formData) => {
  const { data } = await axiosInstance.post("/parents", formData);
  return data;
};

// ✅ Edit student
export const editParent = async ({ id, values }) => {
  const { data } = await axiosInstance.put(`/parents/${id}`, values);
  return data;
};

// ✅ Delete student
export const deleteParent = async (id) => {
  const { data } = await axiosInstance.delete(`/parents/${id}`);
  return data;
};

