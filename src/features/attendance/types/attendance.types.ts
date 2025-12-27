export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE";

export interface Student {
  _id: string;
  name: string;
  rollNumber: string;
  profileImage?: string;
}

export interface AttendanceRecord {
  studentId: string | Student;
  status: AttendanceStatus;
  inTime?: string | null;
  outTime?: string | null;
  remarks?: string;
}

export interface AttendanceStatistics {
  total: number;
  present: number;
  absent: number;
  late: number;
  leave: number;
  notMarked: number;
}

export interface StudentWithAttendance {
  student: Student;
  attendance: {
    status: AttendanceStatus;
    inTime?: string | null;
    outTime?: string | null;
    remarks?: string;
  } | null;
}

export interface AttendanceByClassResponse {
  _id?: string;
  class: {
    _id: string;
    name: string;
  };
  session?: {
    _id: string;
    name: string;
  };
  date: string;
  markedBy?: {
    _id: string;
    name?: string;
    email: string;
    role: string;
  };
  markingSource?: "TEACHER" | "ADMIN";
  isFinalized: boolean;
  students: StudentWithAttendance[];
  statistics: AttendanceStatistics;
}

export interface MarkAttendanceInput {
  classId: string;
  date: string; // YYYY-MM-DD format
  records: {
    studentId: string;
    status: AttendanceStatus;
    inTime?: string | null;
    outTime?: string | null;
    remarks?: string;
  }[];
}

export interface UpdateAttendanceInput {
  records: {
    studentId: string;
    status: AttendanceStatus;
    inTime?: string | null;
    outTime?: string | null;
    remarks?: string;
  }[];
}

export interface AttendanceReportEntry {
  date: string;
  class: {
    _id: string;
    name: string;
  };
  session: {
    _id: string;
    name: string;
  };
  status: AttendanceStatus;
  inTime?: string | null;
  outTime?: string | null;
  remarks?: string;
  isFinalized: boolean;
}

export interface AttendanceReportStatistics {
  totalDays: number;
  markedDays: number;
  notMarked: number;
  present: number;
  absent: number;
  late: number;
  leave: number;
  attendancePercentage: string;
}

export interface AttendanceReportResponse {
  student: {
    _id: string;
    name: string;
    rollNumber: string;
    classId: string;
  };
  period: {
    from: string;
    to: string;
  };
  statistics: AttendanceReportStatistics;
  attendance: AttendanceReportEntry[];
}
