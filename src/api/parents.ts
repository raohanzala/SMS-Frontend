import { AddParentInput, UpdateParentInput } from "@/features/parents/types/parent.types";
import axiosInstance from "./axiosInstance";

export const addParentApi = async (addParentInput: AddParentInput) => {
  const { data } = await axiosInstance.post("/parents", addParentInput);
  return data;
};

export const updateParentApi = async ({ parentId, updateParentInput }: { parentId: string, updateParentInput: UpdateParentInput }) => {
  const { data } = await axiosInstance.put(`/parents/${parentId}`, updateParentInput);
  return data;
};

export const deleteParentApi = async (parentId: string) => {
  const { data } = await axiosInstance.delete(`/parents/${parentId}`);
  return data;
};

export const getAllParentsApi = async (params = {}) => {
  const { data } = await axiosInstance.get("/parents", { params });
  return data;
};

export const getParentByIdApi = async (parentId: string) => {
  const { data } = await axiosInstance.get(`/parents/${parentId}`);
  return data;
};


