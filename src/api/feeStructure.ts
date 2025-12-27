import axiosInstance from "./axiosInstance";

// Types
export interface FeeStructure {
  _id: string;
  classId: string | {
    _id: string;
    name: string;
  };
  monthlyFee: number;
  admissionFee: number;
  examFee: number;
  isActive: boolean;
  schoolId: string;
  campusId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFeeStructureInput {
  classId: string;
  monthlyFee: number;
  admissionFee?: number;
  examFee?: number;
}

export interface UpdateFeeStructureInput {
  monthlyFee?: number;
  admissionFee?: number;
  examFee?: number;
  isActive?: boolean;
}

// Create/Update Fee Structure
export const createFeeStructureApi = async (
  payload: CreateFeeStructureInput
): Promise<{
  success: boolean;
  message: string;
  data: FeeStructure;
}> => {
  const { data } = await axiosInstance.post("/fees/structure", payload);
  return data;
};

// Update Fee Structure
export const updateFeeStructureApi = async (
  id: string,
  payload: UpdateFeeStructureInput
): Promise<{
  success: boolean;
  message: string;
  data: FeeStructure;
}> => {
  const { data } = await axiosInstance.put(`/fees/structure/${id}`, payload);
  return data;
};

// Get Fee Structure
export const getFeeStructureApi = async (
  classId?: string
): Promise<{
  success: boolean;
  message: string;
  data: FeeStructure[];
}> => {
  const { data } = await axiosInstance.get("/fees/structure", {
    params: classId ? { classId } : {},
  });
  return data;
};

// Toggle Fee Structure
export const toggleFeeStructureApi = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  data: FeeStructure;
}> => {
  const { data } = await axiosInstance.patch(`/fees/structure/${id}/toggle`);
  return data;
};

