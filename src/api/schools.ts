import axiosInstance from "./axiosInstance";

export interface SchoolOwner {
  _id: string;
  email: string;
  role: string;
  status?: string;
}

export interface School {
  _id: string;
  name: string;
  code: string;
  ownerId: SchoolOwner | string;
  plan?: string;
  isActive: boolean;
  subscription?: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchoolInput {
  name: string;
  code?: string;
  planId?: string;
}

export interface UpdateSchoolInput {
  name?: string;
  plan?: string;
  isActive?: boolean;
}

export interface SchoolsResponse {
  success: boolean;
  message: string;
  data: {
    schools: School[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalSchools: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
    };
  };
}

export interface SchoolResponse {
  success: boolean;
  message: string;
  data: School;
}

// Get all schools with filters
export const getAllSchoolsApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  plan?: string;
}): Promise<SchoolsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
  if (params?.plan) queryParams.append("plan", params.plan);

  const queryString = queryParams.toString();
  const url = `/schools${queryString ? `?${queryString}` : ""}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

// Get school by ID
export const getSchoolByIdApi = async (schoolId: string): Promise<SchoolResponse> => {
  const { data } = await axiosInstance.get(`/schools/${schoolId}`);
  return data;
};

// Create school
export const createSchoolApi = async (schoolData: CreateSchoolInput) => {
  const { data } = await axiosInstance.post("/schools", schoolData);
  return data;
};

// Update school
export const updateSchoolApi = async (
  schoolId: string,
  schoolData: UpdateSchoolInput
): Promise<SchoolResponse> => {
  const { data } = await axiosInstance.put(`/schools/${schoolId}`, schoolData);
  return data;
};

// Toggle school status (activate/suspend)
export const toggleSchoolStatusApi = async (
  schoolId: string,
  isActive: boolean
): Promise<SchoolResponse> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/status`, { isActive });
  return data;
};

