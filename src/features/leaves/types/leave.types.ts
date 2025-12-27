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

