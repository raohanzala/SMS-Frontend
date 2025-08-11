// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getAllTeachers = async (params = {}) => {
  const { data } = await axiosInstance.get("/teachers", params);
  return data;
};

// ✅ Get single student by ID
export const getTeacherById = async (id) => {
  const { data } = await axiosInstance.get(`/teachers/${id}`);
  return data;
};

// ✅ Add new student (with image upload)
export const createTeacherApi = async (formData) => {
  const { data } = await axiosInstance.post("/teachers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Edit student
export const editTeacher = async (id, formData) => {
  const { data } = await axiosInstance.put(`/teachers/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Delete student
export const deleteTeacher = async (id) => {
  const { data } = await axiosInstance.delete(`/teachers/${id}`);
  return data;
};

