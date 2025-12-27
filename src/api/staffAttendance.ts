import axiosInstance from "./axiosInstance";

// Types
export interface StaffAttendanceRecord {
  staffId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE" | "HALF_DAY";
  inTime?: string | null;
  outTime?: string | null;
  remarks?: string;
}

export interface Staff {
  _id: string;
  name: string;
  designation?: string;
  profileImage?: string;
}

export interface StaffWithAttendance {
  staff: Staff;
  attendance: {
    status: string;
    inTime?: string | null;
    outTime?: string | null;
    remarks?: string;
  } | null;
}

export interface StaffAttendanceStatistics {
  total: number;
  present: number;
  absent: number;
  late: number;
  leave: number;
  halfDay: number;
  notMarked: number;
}

export interface StaffAttendanceResponse {
  _id?: string;
  date: string;
  markedBy?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  isFinalized: boolean;
  staff: StaffWithAttendance[];
  statistics?: StaffAttendanceStatistics;
}

export interface MarkStaffAttendanceInput {
  date: string;
  records: StaffAttendanceRecord[];
}

export interface UpdateStaffAttendanceInput {
  records: StaffAttendanceRecord[];
}

export interface StaffAttendanceReportEntry {
  date: string;
  status: string;
  inTime?: string | null;
  outTime?: string | null;
  remarks?: string;
  isFinalized: boolean;
}

export interface StaffAttendanceReportResponse {
  staff: {
    _id: string;
    name: string;
    designation?: string;
  };
  period: {
    from: string;
    to: string;
  };
  statistics: {
    totalDays: number;
    markedDays: number;
    notMarked: number;
    present: number;
    absent: number;
    late: number;
    leave: number;
    halfDay: number;
    attendancePercentage: string;
  };
  attendance: StaffAttendanceReportEntry[];
}

// Get staff attendance by date
export const getStaffAttendanceByDateApi = async (
  date: string,
  campusId?: string
): Promise<{
  success: boolean;
  message: string;
  data: StaffAttendanceResponse;
}> => {
  const { data } = await axiosInstance.get("/attendance/staff", {
    params: { date, campusId },
  });
  return data;
};

// Mark staff attendance (create)
export const markStaffAttendanceApi = async (
  payload: MarkStaffAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: StaffAttendanceResponse;
}> => {
  const { data } = await axiosInstance.post("/attendance/staff", payload);
  return data;
};

// Update staff attendance
export const updateStaffAttendanceApi = async (
  attendanceId: string,
  payload: UpdateStaffAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: StaffAttendanceResponse;
}> => {
  const { data } = await axiosInstance.put(
    `/attendance/staff/${attendanceId}`,
    payload
  );
  return data;
};

// Finalize staff attendance
export const finalizeStaffAttendanceApi = async (
  attendanceId: string
): Promise<{
  success: boolean;
  message: string;
  data: StaffAttendanceResponse;
}> => {
  const { data } = await axiosInstance.post(
    `/attendance/staff/${attendanceId}/finalize`
  );
  return data;
};

// Reopen staff attendance
export const reopenStaffAttendanceApi = async (
  attendanceId: string
): Promise<{
  success: boolean;
  message: string;
  data: StaffAttendanceResponse;
}> => {
  const { data } = await axiosInstance.post(
    `/attendance/staff/${attendanceId}/reopen`
  );
  return data;
};

// Get staff attendance report
export const getStaffAttendanceReportApi = async (
  staffId: string,
  from: string,
  to: string
): Promise<{
  success: boolean;
  message: string;
  data: StaffAttendanceReportResponse;
}> => {
  const { data } = await axiosInstance.get("/attendance/staff/report", {
    params: { staffId, from, to },
  });
  return data;
};

