import axiosInstance from "./axiosInstance";

export interface SchoolOwnerUser {
  _id: string;
  email: string;
  role: string;
  status?: string;
  isFirstLogin?: boolean;
  createdAt?: string;
  schoolId?: {
    _id: string;
    name: string;
    code: string;
    isActive: boolean;
  };
}

export interface SchoolOwnerSchool {
  _id: string;
  name: string;
  code: string;
  isActive: boolean;
  ownerId?: {
    _id: string;
    email: string;
    role: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface SchoolOwnerCampus {
  _id: string;
  name: string;
  address?: string;
}

export interface SchoolOwner {
  _id: string;
  user: SchoolOwnerUser | string;
  schoolId: SchoolOwnerSchool | string | null;
  campusId: SchoolOwnerCampus | string | null;
  name: string;
  phone?: string;
  address?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SchoolOwnerDetails extends SchoolOwner {
  school?: SchoolOwnerSchool;
  subscription?: {
    _id: string;
    status: string;
    planId: {
      _id: string;
      name: string;
      price: number;
      features?: Record<string, unknown>;
    };
    startDate: string;
    endDate: string;
  };
  campusesCount?: number;
}

export interface SchoolOwnersResponse {
  success: boolean;
  message: string;
  data: {
    owners: SchoolOwner[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalOwners: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface SchoolOwnerResponse {
  success: boolean;
  message: string;
  data: SchoolOwnerDetails;
}

// Get all school owners with filters
export const getAllSchoolOwnersApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  hasSchool?: boolean;
}): Promise<SchoolOwnersResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);
  if (params?.hasSchool !== undefined) queryParams.append("hasSchool", params.hasSchool.toString());

  const queryString = queryParams.toString();
  const url = `/school-owners${queryString ? `?${queryString}` : ""}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

// Get school owner by ID
export const getSchoolOwnerByIdApi = async (
  ownerId: string
): Promise<SchoolOwnerResponse> => {
  const { data } = await axiosInstance.get(`/school-owners/${ownerId}`);
  return data;
};

