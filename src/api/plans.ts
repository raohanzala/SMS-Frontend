import axiosInstance from "./axiosInstance";
import { CreatePlanInput, UpdatePlanInput } from "@/features/plans/types/plans.types";

// Public API - no auth required
export const getPublicPlansApi = async () => {
  const { data } = await axiosInstance.get("/super-admin/plans?isActive=true");
  return data;
};

// Admin API - requires auth
export const getAllPlansApi = async (params?: { isActive?: boolean }) => {
  const queryParams = new URLSearchParams();
  if (params?.isActive !== undefined) {
    queryParams.append("isActive", params.isActive.toString());
  }
  const queryString = queryParams.toString();
  const url = `/super-admin/plans${queryString ? `?${queryString}` : ""}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

export const getPlanByIdApi = async (planId: string) => {
  const { data } = await axiosInstance.get(`/super-admin/plans/${planId}`);
  return data;
};

export const createPlanApi = async (planData: CreatePlanInput) => {
  const { data } = await axiosInstance.post("/super-admin/plans", planData);
  return data;
};

export const updatePlanApi = async (planId: string, planData: UpdatePlanInput) => {
  const { data } = await axiosInstance.patch(`/super-admin/plans/${planId}`, planData);
  return data;
};

export const deletePlanApi = async (planId: string) => {
  const { data } = await axiosInstance.delete(`/super-admin/plans/${planId}`);
  return data;
};

