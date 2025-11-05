import { AddSubjectInput, UpdateSubjectInput } from "@/features/subjects/types/subject.types";
import axiosInstance from "./axiosInstance";

export const getAllSubjectsApi = async (params = {}) => {
  const { data } = await axiosInstance.get("/subjects", { params });
  return data;
};

export const addSubjectApi = async (addSubjectInput: AddSubjectInput) => {
  const { data } = await axiosInstance.post("/subjects", addSubjectInput);
  return data;
};

export const updateSubjectApi = async ({
  subjectId,
  updateSubjectInput,
}: {
  subjectId: string;
  updateSubjectInput: UpdateSubjectInput;
}) => {
  const { data } = await axiosInstance.put(`/subjects/${subjectId}`, updateSubjectInput);
  return data;
};

export const deleteSubjectApi = async (subjectId: string) => {
  const { data } = await axiosInstance.delete(`/subjects/${subjectId}`);
  return data;
};

