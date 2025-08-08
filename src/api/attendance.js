// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getClassesAttendance = async (params = {}) => {
  const { data } = await axiosInstance.get("/attendance/classes", params);
  return data;
};
export const getAllAttendance = async (params = {}) => {
  const { data } = await axiosInstance.get("/attendance", params);
  return data;
};

// ✅ Add new student (with image upload)
export const createAttendance = async (formData) => {
  const { data } = await axiosInstance.post("/attendance", formData);
  console.log(formData)
  return data;
};

