import axiosInstance from "./axiosInstance";
import { AddSettingsInput, UpdateSettingsInput } from "@/features/settings/types/settings.types";

export const getAllSettingsApi = async () => {
  const { data } = await axiosInstance.get("/settings");
  return data;
};

export const getSettingsByIdApi = async (settingsId: string) => {
  const { data } = await axiosInstance.get(`/settings/${settingsId}`);
  return data;
};

export const addSettingsApi = async (settingsData: AddSettingsInput) => {
  const { data } = await axiosInstance.post("/settings", settingsData);
  return data;
};

export const updateSettingsApi = async ({
  settingsId,
  settingsData,
}: {
  settingsId: string;
  settingsData: UpdateSettingsInput;
}) => {
  const { data } = await axiosInstance.put(`/settings/${settingsId}`, settingsData);
  return data;
};

export const deleteSettingsApi = async (settingsId: string) => {
  const { data } = await axiosInstance.delete(`/settings/${settingsId}`);
  return data;
};

