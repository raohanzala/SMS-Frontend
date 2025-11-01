export type AttendanceStatus = "Present" | "Absent" | "Late";

export interface Attendance {
  _id: string;
  user: string; // user ID
  role: "student" | "teacher";
  class?: string; // optional for teacher
  date: string;
  status: AttendanceStatus;
  createdAt?: string;
  updatedAt?: string;
}
