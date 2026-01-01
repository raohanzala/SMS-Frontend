import axiosInstance from "./axiosInstance";
import { UpdateSaaSSettingsInput } from "@/features/saasSettings/types/saasSettings.types";

export const getSaaSSettingsApi = async () => {
  const { data } = await axiosInstance.get("/super-admin/settings");
  return data;
};

export const updateSaaSSettingsApi = async (settingsData: UpdateSaaSSettingsInput) => {
  const { data } = await axiosInstance.patch("/super-admin/settings", settingsData);
  return data;
};

