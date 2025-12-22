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
  settingsId?: string;
  settingsData: UpdateSettingsInput;
}) => {
  // Backend accepts PUT /settings or PUT /settings/:settingsId
  const url = settingsId ? `/settings/${settingsId}` : `/settings`;
  const { data } = await axiosInstance.put(url, settingsData);
  return data;
};

export const deleteSettingsApi = async (settingsId?: string) => {
  // Backend accepts DELETE /settings or DELETE /settings/:settingsId
  const url = settingsId ? `/settings/${settingsId}` : `/settings`;
  const { data } = await axiosInstance.delete(url);
  return data;
};

