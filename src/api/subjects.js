// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getAllSubjects = async (params = {}) => {
  const { data } = await axiosInstance.get("/subjects", params);
  return data;
};

// ✅ Add new student (with image upload)
export const createSubject = async (formData) => {
  const { data } = await axiosInstance.post("/subjects", formData);
  console.log(formData)
  return data;
};

// ✅ Edit student
export const editSubject = async ({ id, values }) => {
  const { data } = await axiosInstance.put(`/subjects/${id}`, values);
  return data;
};

// ✅ Delete student
export const deleteSubject = async (id) => {
  const { data } = await axiosInstance.delete(`/subjects/${id}`);
  return data;
};
