import axiosInstance from "./axiosInstance";

// Types
export interface LeaveRequest {
  _id: string;
  userId: string | {
    _id: string;
    email: string;
    role: string;
  };
  leaveType: "SICK" | "CASUAL" | "EMERGENCY" | "OTHER";
  fromDate: string;
  toDate: string;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approvedBy?: string | {
    _id: string;
    email: string;
    role: string;
  };
  schoolId: string;
  campusId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeaveRequestInput {
  leaveType: "SICK" | "CASUAL" | "EMERGENCY" | "OTHER";
  fromDate: string;
  toDate: string;
  reason?: string;
}

// Create Leave Request
export const createLeaveRequestApi = async (
  payload: CreateLeaveRequestInput
): Promise<{
  success: boolean;
  message: string;
  data: LeaveRequest;
}> => {
  const { data } = await axiosInstance.post("/leaves", payload);
  return data;
};

// Approve Leave Request
export const approveLeaveRequestApi = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  data: LeaveRequest;
}> => {
  const { data } = await axiosInstance.post(`/leaves/${id}/approve`);
  return data;
};

// Reject Leave Request
export const rejectLeaveRequestApi = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  data: LeaveRequest;
}> => {
  const { data } = await axiosInstance.post(`/leaves/${id}/reject`);
  return data;
};

// Get Leave Requests
export const getLeaveRequestsApi = async (
  userId?: string,
  status?: string
): Promise<{
  success: boolean;
  message: string;
  data: LeaveRequest[];
}> => {
  const { data } = await axiosInstance.get("/leaves", {
    params: {
      ...(userId && { userId }),
      ...(status && { status }),
    },
  });
  return data;
};

