import axiosInstance from "./axiosInstance";

export interface SubscriptionSchool {
  _id: string;
  name: string;
  code: string;
  ownerId?: string;
}

export interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  features?: Record<string, unknown>;
  billingCycle?: string;
}

export interface Subscription {
  _id: string;
  schoolId: SubscriptionSchool | string;
  planId: SubscriptionPlan | string;
  status: "ACTIVE" | "TRIAL" | "EXPIRED" | "CANCELLED";
  startDate: string;
  endDate: string;
  trialEndsAt?: string;
  isTrial?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssignPlanInput {
  schoolId: string;
  planId: string;
  startDate?: string;
  endDate?: string;
  isTrial?: boolean;
}

export interface SubscriptionsResponse {
  success: boolean;
  message: string;
  data: {
    subscriptions: Subscription[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalSubscriptions: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
    };
  };
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data: Subscription;
}

// Get all subscriptions with filters
export const getAllSubscriptionsApi = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  schoolId?: string;
}): Promise<SubscriptionsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.status) queryParams.append("status", params.status);
  if (params?.schoolId) queryParams.append("schoolId", params.schoolId);

  const queryString = queryParams.toString();
  const url = `/super-admin/subscriptions${queryString ? `?${queryString}` : ""}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

// Get subscription by school ID
export const getSubscriptionBySchoolApi = async (
  schoolId: string
): Promise<SubscriptionResponse> => {
  const { data } = await axiosInstance.get(`/super-admin/subscriptions/school/${schoolId}`);
  return data;
};

// Assign plan to school
export const assignPlanToSchoolApi = async (
  input: AssignPlanInput
): Promise<SubscriptionResponse> => {
  const { data } = await axiosInstance.post("/super-admin/subscriptions/assign", input);
  return data;
};

// Cancel subscription
export const cancelSubscriptionApi = async (
  subscriptionId: string
): Promise<SubscriptionResponse> => {
  const { data } = await axiosInstance.patch(`/super-admin/subscriptions/${subscriptionId}/cancel`);
  return data;
};

