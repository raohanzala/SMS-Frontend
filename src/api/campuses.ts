import axiosInstance from "./axiosInstance";

export interface Campus {
  _id: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCampusInput {
  name: string;
  code: string;
  address?: string;
  phone?: string;
}

export interface UpdateCampusInput {
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
}

// Get all campuses
export const getAllCampusesApi = async (): Promise<{
  success: boolean;
  message: string;
  data: Campus[];
}> => {
  const { data } = await axiosInstance.get("/campuses");
  return data;
};

// Get campus by ID
export const getCampusByIdApi = async (campusId: string): Promise<{
  success: boolean;
  message: string;
  data: Campus;
}> => {
  const { data } = await axiosInstance.get(`/campuses/${campusId}`);
  return data;
};

// Create campus
export const createCampusApi = async (payload: CreateCampusInput): Promise<{
  success: boolean;
  message: string;
  data: Campus;
}> => {
  const { data } = await axiosInstance.post("/campuses", payload);
  return data;
};

// Update campus
export const updateCampusApi = async (
  campusId: string,
  payload: UpdateCampusInput
): Promise<{
  success: boolean;
  message: string;
  data: Campus;
}> => {
  const { data } = await axiosInstance.put(`/campuses/${campusId}`, payload);
  return data;
};

// Delete campus (soft delete)
export const deleteCampusApi = async (campusId: string): Promise<{
  success: boolean;
  message: string;
}> => {
  const { data } = await axiosInstance.delete(`/campuses/${campusId}`);
  return data;
};

// Switch campus
export const switchCampusApi = async (campusId: string): Promise<{
  success: boolean;
  message: string;
  data: {
    token: string;
    campus: {
      _id: string;
      name: string;
      code: string;
    };
  };
}> => {
  const { data } = await axiosInstance.post("/auth/switch-campus", { campusId });
  return data;
};

