import { AddTimetableInput } from "@/features/timetable/types/timetable.types";
import axiosInstance from "./axiosInstance";

// ✅ Get all timetables (with filters/pagination)
export const getAllTimetablesApi = async (params = {}) => {
  const { data } = await axiosInstance.get("/timetable", { params });
  return data;
};

// ✅ Get timetable by ID
export const getTimetableByIdApi = async (id: string) => {
  const { data } = await axiosInstance.get(`/timetable/${id}`);
  return data;
};

// ✅ Get class timetable
export const getClassTimetableApi = async (classId: string) => {
  const { data } = await axiosInstance.get(`/timetable/class/${classId}`);
  return data;
};

// ✅ Get student timetable
export const getStudentTimetableApi = async (studentId: string) => {
  const { data } = await axiosInstance.get(`/timetable/student/${studentId}`);
  return data;
};

// ✅ Get teacher timetable
export const getTeacherTimetableApi = async (teacherId: string) => {
  const { data } = await axiosInstance.get(`/timetable/teacher/${teacherId}`);
  return data;
};

// ✅ Create new timetable
export const createTimetableApi = async (addTimetableInput: AddTimetableInput) => {
  const { data } = await axiosInstance.post("/timetable", addTimetableInput);
  return data;
};

// ✅ Update timetable
export const updateTimetableApi = async ({ id, formData }: { id: string; formData: Record<string, unknown> }) => {
  const { data } = await axiosInstance.put(`/timetable/${id}`, formData);
  return data;
};

// ✅ Delete timetable
export const deleteTimetableApi = async (id: string) => {
  const { data } = await axiosInstance.delete(`/timetable/${id}`);
  return data;
};

// Legacy export for backward compatibility
export const getTimetableApi = getAllTimetablesApi;
