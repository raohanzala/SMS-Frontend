// src/api/students.js
import axiosInstance from "./axiosInstance";

// ✅ Get all students (with filters/pagination)
export const getAllStudents = async (params = {}) => {
  const { data } = await axiosInstance.get("/students", { params });
  return data;
};

// ✅ Get single student by ID
export const getStudentById = async (id) => {
  const { data } = await axiosInstance.get(`/students/${id}`);
  return data;
};

// ✅ Add new student (with image upload)
export const createStudentApi = async (formData) => {
  const { data } = await axiosInstance.post("/students", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Edit student
export const editStudent = async ({ id, values }) => {
  const { data } = await axiosInstance.put(`/students/${id}`, values, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Delete student
export const deleteStudent = async (id) => {
  const { data } = await axiosInstance.delete(`/students/${id}`);
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
