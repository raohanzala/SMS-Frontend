// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getAllTeachers = async (params = {}) => {
  const { data } = await axiosInstance.get("/teachers", params);
  return data;
};

// ✅ Get single student by ID
export const getStudentById = async (id) => {
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

// ✅ Assign class to student
export const assignClassToStudent = async ({ id, classId }) => {
  const { data } = await axiosInstance.patch(`/students/${id}/assign-class`, { classId });
  return data;
};

// ✅ Get students by class
export const getStudentsByClass = async (classId) => {
  const { data } = await axiosInstance.get(`/students/class/${classId}`);
  return data;
};

// ✅ Bulk add students
export const bulkAddStudents = async (studentsArray) => {
  const { data } = await axiosInstance.post("/students/bulk-add", studentsArray);
  return data;
};
