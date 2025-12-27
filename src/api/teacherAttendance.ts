import axiosInstance from "./axiosInstance";

// Types
export interface TeacherAttendanceRecord {
  teacherId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE";
  inTime?: string | null;
  outTime?: string | null;
  substituteAssigned?: boolean;
  substituteTeacherId?: string | null;
  remarks?: string;
}

export interface Teacher {
  _id: string;
  name: string;
  profileImage?: string;
}

export interface TeacherWithAttendance {
  teacher: Teacher;
  attendance: {
    status: string;
    inTime?: string | null;
    outTime?: string | null;
    substituteAssigned?: boolean;
    substituteTeacher?: Teacher | null;
    remarks?: string;
  } | null;
}

export interface TeacherAttendanceResponse {
  _id?: string;
  session?: {
    _id: string;
    name: string;
  };
  date: string;
  markedBy?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  markingSource?: string;
  isFinalized: boolean;
  teachers: TeacherWithAttendance[];
  statistics?: {
    total: number;
    present: number;
    absent: number;
    late: number;
    leave: number;
    notMarked: number;
  };
}

export interface MarkTeacherAttendanceInput {
  sessionId: string;
  date: string;
  records: TeacherAttendanceRecord[];
}

export interface UpdateTeacherAttendanceInput {
  records: TeacherAttendanceRecord[];
}

export interface TeacherAttendanceReportEntry {
  date: string;
  session: {
    _id: string;
    name: string;
  };
  status: string;
  inTime?: string | null;
  outTime?: string | null;
  substituteAssigned?: boolean;
  substituteTeacher?: Teacher | null;
  remarks?: string;
  isFinalized: boolean;
}

export interface TeacherAttendanceReportResponse {
  teacher: {
    _id: string;
    name: string;
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
    attendancePercentage: string;
  };
  attendance: TeacherAttendanceReportEntry[];
}

// Get teacher attendance by date
export const getTeacherAttendanceByDateApi = async (
  date: string
): Promise<{
  success: boolean;
  message: string;
  data: TeacherAttendanceResponse;
}> => {
  const { data } = await axiosInstance.get("/attendance/teachers", {
    params: { date },
  });
  return data;
};

// Mark teacher attendance (create)
export const markTeacherAttendanceApi = async (
  payload: MarkTeacherAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: TeacherAttendanceResponse;
}> => {
  const { data } = await axiosInstance.post("/attendance/teachers", payload);
  return data;
};

// Update teacher attendance
export const updateTeacherAttendanceApi = async (
  attendanceId: string,
  payload: UpdateTeacherAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: TeacherAttendanceResponse;
}> => {
  const { data } = await axiosInstance.put(
    `/attendance/teachers/${attendanceId}`,
    payload
  );
  return data;
};

// Finalize teacher attendance
export const finalizeTeacherAttendanceApi = async (
  attendanceId: string
): Promise<{
  success: boolean;
  message: string;
  data: TeacherAttendanceResponse;
}> => {
  const { data } = await axiosInstance.post(
    `/attendance/teachers/${attendanceId}/finalize`
  );
  return data;
};

// Reopen teacher attendance
export const reopenTeacherAttendanceApi = async (
  attendanceId: string
): Promise<{
  success: boolean;
  message: string;
  data: TeacherAttendanceResponse;
}> => {
  const { data } = await axiosInstance.post(
    `/attendance/teachers/${attendanceId}/reopen`
  );
  return data;
};

// Get teacher attendance report
export const getTeacherAttendanceReportApi = async (
  teacherId: string,
  from: string,
  to: string
): Promise<{
  success: boolean;
  message: string;
  data: TeacherAttendanceReportResponse;
}> => {
  const { data } = await axiosInstance.get("/attendance/teachers/report", {
    params: { teacherId, from, to },
  });
  return data;
};

