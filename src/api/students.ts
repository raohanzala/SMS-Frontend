// src/api/students.js
import { AddStudentInput, BulkStudentData, UpdateStudentInput } from "@/features/students/types/student.types";
import axiosInstance from "./axiosInstance";

export const addStudentApi = async (addStudentInput: AddStudentInput) => {
  const { data } = await axiosInstance.post("/students", addStudentInput, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateStudentApi = async ({ studentId, updateStudentInput }: { studentId: string, updateStudentInput: UpdateStudentInput }) => {
  const { data } = await axiosInstance.put(`/students/${studentId}`, updateStudentInput, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteStudentApi = async (studentId: string) => {
  const { data } = await axiosInstance.delete(`/students/${studentId}`);
  return data;
};

export const getStudentByIdApi = async (studentId: string | undefined) => {
  const { data } = await axiosInstance.get(`/students/${studentId}`);
  return data;
};

export const getAllStudentsApi = async (params = {}) => {
  const { data } = await axiosInstance.get("/students", { params });
  return data;
};

export const getStudentsByClassApi = async (classId: string) => {
  const { data } = await axiosInstance.get(`/students/class/${classId}`);
  return data;
};

export const assignClassToStudentApi = async ({ studentId, classId }: { studentId: string, classId: string }) => {
  const { data } = await axiosInstance.patch(`/students/${studentId}/assign-class`, { classId });
  return data;
};

export const bulkAddStudentsApi = async (studentsArray: BulkStudentData[]) => {
  const { data } = await axiosInstance.post("/students/bulk-add", studentsArray);
  return data;
};
