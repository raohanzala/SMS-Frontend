import axiosInstance from "./axiosInstance";
import {
  AttendanceByClassResponse,
  MarkAttendanceInput,
  UpdateAttendanceInput,
  AttendanceReportResponse,
} from "@/features/attendance/types/attendance.types";

// Get attendance by class and date
// GET /api/attendance/students?classId=xxx&date=2025-03-20
export const getAttendanceByClassAndDateApi = async (
  classId: string,
  date: string
): Promise<{
  success: boolean;
  message: string;
  data: AttendanceByClassResponse;
}> => {
  const { data } = await axiosInstance.get("/attendance/students", {
    params: { classId, date },
  });
  return data;
};

// Mark attendance
// POST /api/attendance/students
export const markAttendanceApi = async (
  payload: MarkAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: any;
}> => {
  const { data } = await axiosInstance.post("/attendance/students", payload);
  return data;
};

// Update attendance
// PUT /api/attendance/students/:attendanceId
export const updateAttendanceApi = async (
  attendanceId: string,
  payload: UpdateAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: any;
}> => {
  const { data } = await axiosInstance.put(`/attendance/students/${attendanceId}`, payload);
  return data;
};

// Finalize attendance
// POST /api/attendance/students/:attendanceId/finalize
export const finalizeAttendanceApi = async (
  attendanceId: string
): Promise<{
  success: boolean;
  message: string;
  data: any;
}> => {
  const { data } = await axiosInstance.post(`/attendance/students/${attendanceId}/finalize`);
  return data;
};

// Reopen attendance
// POST /api/attendance/students/:attendanceId/reopen
export const reopenAttendanceApi = async (
  attendanceId: string
): Promise<{
  success: boolean;
  message: string;
  data: any;
}> => {
  const { data } = await axiosInstance.post(`/attendance/students/${attendanceId}/reopen`);
  return data;
};

// Get attendance report
// GET /api/attendance/students/report?studentId=xxx&from=2025-03-01&to=2025-03-31
export const getAttendanceReportApi = async (
  studentId: string,
  from: string,
  to: string
): Promise<{
  success: boolean;
  message: string;
  data: AttendanceReportResponse;
}> => {
  const { data } = await axiosInstance.get("/attendance/students/report", {
    params: { studentId, from, to },
  });
  return data;
};

