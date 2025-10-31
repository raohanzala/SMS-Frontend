// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getAllParents = async (params = {}) => {
  console.log(params)
  const { data } = await axiosInstance.get("/parents", { params });
  return data;
};

export const getParentById = async (parentId) => {
  const { data } = await axiosInstance.get(`/parents/${parentId}`);
  return data;
};

// ✅ Add new student (with image upload)
export const createParent = async (formData) => {
  const { data } = await axiosInstance.post("/parents", formData);
  return data;
};

// ✅ Edit student
export const editParent = async ({ parentId, values }) => {
  const { data } = await axiosInstance.put(`/parents/${parentId}`, values);
  return data;
};

// ✅ Delete student
export const deleteParent = async (parentId) => {
  const { data } = await axiosInstance.delete(`/parents/${parentId}`);
  return data;
};

