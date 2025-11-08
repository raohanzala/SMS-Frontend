export type AttendanceStatus = "Present" | "Absent" | "Leave" | "Late" | "Half Day";
export type UserModel = "Student" | "Teacher" | "Employee";

export interface ClassForAttendance {
  _id: string;
  name: string;
  monthlyFee?: number;
  classTeacher?: {
    _id: string;
    name: string;
    designation?: string;
  };
}

export interface StudentForAttendance {
  _id: string;
  name: string;
  rollNumber?: string;
  class?: {
    _id: string;
    name: string;
  } | string;
  profileImage?: string;
  attendance?: {
    status: AttendanceStatus;
    remarks?: string;
  } | null;
}

export interface StudentsByClassResponse {
  class: {
    _id: string;
    name: string;
  };
  students: StudentForAttendance[];
  totalStudents: number;
}

export interface AttendanceRecord {
  user: string;
  status: AttendanceStatus;
  userModel: UserModel;
  remarks?: string;
}

export interface MarkAttendanceInput {
  date: string;
  attendance: AttendanceRecord[];
  classId: string;
  recordedBy?: string;
}

export interface UpdateAttendanceInput {
  status?: AttendanceStatus;
  remarks?: string;
  recordedBy?: string;
}

export interface Attendance {
  _id: string;
  date: string;
  user: string;
  userModel: UserModel;
  status: AttendanceStatus;
  remarks?: string;
  classId?: string;
  recordedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

