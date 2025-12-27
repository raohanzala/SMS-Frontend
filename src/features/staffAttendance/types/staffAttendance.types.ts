export interface Staff {
  _id: string;
  name: string;
  designation?: string;
  profileImage?: string;
}

export interface StaffAttendanceRecord {
  staffId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE" | "HALF_DAY";
  inTime?: string | null;
  outTime?: string | null;
  remarks?: string;
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

