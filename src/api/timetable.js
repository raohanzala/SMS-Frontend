// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getTimetable = async (params = {}) => {
  const { data } = await axiosInstance.get("/timetable", params);
  return data;
};


// ✅ Add new student (with image upload)
export const createTimetable = async (formData) => {
  const { data } = await axiosInstance.post("/timetable", formData);
  return data;
};

// ✅ Edit student
export const editTimetable = async (id, formData) => {
  const { data } = await axiosInstance.put(`/timetable/${id}`, formData);
  return data;
};

// ✅ Delete student
export const deleteTimetable = async (id) => {
  const { data } = await axiosInstance.delete(`/timetable/${id}`);
  return data;
};
