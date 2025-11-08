import { ClassForAttendance, StudentForAttendance, AttendanceStatus } from "./attendance.types";

export interface ClassAttendanceToolbarProps {
  onFilterChange: (classId: string, date: string) => void;
  selectedClassId?: string;
  selectedDate?: string;
}

export interface ClassAttendanceTableProps {
  students: StudentForAttendance[];
  classInfo?: {
    _id: string;
    name: string;
  };
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onRemarksChange?: (studentId: string, remarks: string) => void;
  onSave: () => void;
  isSaving?: boolean;
  attendanceRecords: Record<string, { status: AttendanceStatus; remarks?: string }>;
}

