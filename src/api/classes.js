import axiosInstance from "./axiosInstance";

// ✅ Get all classes
export const getAllClasses = async (page, limit) => {
  const res = await axiosInstance.get(`/classes?page=${page}&limit=${limit}`);
  return res.data;
};

// ✅ Create new class
export const createClass = async (classData) => {
  const res = await axiosInstance.post(`/classes`, classData);
  return res.data;
};

// ✅ Update class
export const updateClass = async ({ classId, classData }) => {
  const res = await axiosInstance.put(`/classes/${classId}`, classData);
  return res.data;
};

// ✅ Delete class
export const deleteClass = async (classId) => {
  const res = await axiosInstance.delete(`/classes/${classId}`);
  return res.data;
};

// ✅ Assign teacher to class
export const assignTeacher = async ({ classId, teacherId }) => {
  const res = await axiosInstance.patch(`/classes/${classId}/assign-teacher`, { teacherId });
  return res.data;
};
