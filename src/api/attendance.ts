import axiosInstance from "./axiosInstance";
import {
  ClassForAttendance,
  StudentsByClassResponse,
  MarkAttendanceInput,
  UpdateAttendanceInput,
  Attendance,
} from "@/features/ClassAttendance/types/attendance.types";

// Get classes for attendance dropdown
export const getClassesForAttendanceApi = async (): Promise<{
  success: boolean;
  message: string;
  data: ClassForAttendance[];
}> => {
  const { data } = await axiosInstance.get("/attendance/classes");
  return data;
};

// Get students by class for attendance marking
export const getStudentsByClassForAttendanceApi = async (
  classId: string,
  date?: string
): Promise<{
  success: boolean;
  message: string;
  data: StudentsByClassResponse;
}> => {
  const url = `/attendance/students/class/${classId}${date ? `?date=${date}` : ""}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

// Mark attendance (bulk)
export const markAttendanceApi = async (
  payload: MarkAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: {
    matched: number;
    modified: number;
    upserted: number;
    totalRecords: number;
  };
}> => {
  const { data } = await axiosInstance.post("/attendance/mark", payload);
  return data;
};

// Update attendance
export const updateAttendanceApi = async (
  attendanceId: string,
  payload: UpdateAttendanceInput
): Promise<{
  success: boolean;
  message: string;
  data: Attendance;
}> => {
  const { data } = await axiosInstance.put(`/attendance/${attendanceId}`, payload);
  return data;
};

// Delete attendance
export const deleteAttendanceApi = async (
  attendanceId: string
): Promise<{
  success: boolean;
  message: string;
  data: Attendance;
}> => {
  const { data } = await axiosInstance.delete(`/attendance/${attendanceId}`);
  return data;
};

