export interface Teacher {
  _id: string;
  name: string;
  profileImage?: string;
}

export interface TeacherAttendanceRecord {
  teacherId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE";
  inTime?: string | null;
  outTime?: string | null;
  substituteAssigned?: boolean;
  substituteTeacherId?: string | null;
  remarks?: string;
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

export interface TeacherAttendanceStatistics {
  total: number;
  present: number;
  absent: number;
  late: number;
  leave: number;
  notMarked: number;
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
  statistics?: TeacherAttendanceStatistics;
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

