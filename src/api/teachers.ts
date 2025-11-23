import { AddTeacherInput, UpdateTeacherInput } from "@/features/teachers/types/teacher.types";
import axiosInstance from "./axiosInstance";

export const getAllTeachersApi = async (params = {}) => {
  const { data } = await axiosInstance.get("/teachers", { params });
  return data;
};

export const getTeacherByIdApi = async (id: string) => {
  const { data } = await axiosInstance.get(`/teachers/${id}`);
  return data;
};

export const addTeacherApi = async ({addTeacherInput}: {addTeacherInput: AddTeacherInput}) => {
  const { data } = await axiosInstance.post("/teachers", addTeacherInput, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateTeacherApi = async ({teacherId, updateTeacherInput}: {teacherId: string, updateTeacherInput: UpdateTeacherInput}) => {
  const { data } = await axiosInstance.put(`/teachers/${teacherId}`, updateTeacherInput, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteTeacherApi = async (id: string) => {
  const { data } = await axiosInstance.delete(`/teachers/${id}`);
  return data;
};

