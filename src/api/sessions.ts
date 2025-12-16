import axiosInstance from "./axiosInstance";
import { AddSessionInput, UpdateSessionInput } from "@/features/sessions/types/session.types";

export const getSessionsApi = async (params = {}) => {
  const res = await axiosInstance.get(`/sessions`, { params });
  return res.data;
};

export const getSessionByIdApi = async (sessionId: string) => {
  const { data } = await axiosInstance.get(`/sessions/${sessionId}`);
  return data;
};

export const addSessionApi = async ({ addSessionInput }: { addSessionInput: AddSessionInput }) => {
  const res = await axiosInstance.post(`/sessions`, addSessionInput);
  return res.data;
};

export const updateSessionApi = async ({ sessionId, updateSessionInput }: { sessionId: string, updateSessionInput: UpdateSessionInput }) => {
  const res = await axiosInstance.put(`/sessions/${sessionId}`, updateSessionInput);
  return res.data;
};

export const deleteSessionApi = async (sessionId: string) => {
  const res = await axiosInstance.delete(`/sessions/${sessionId}`);
  return res.data;
};

