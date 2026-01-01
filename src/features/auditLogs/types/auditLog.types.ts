export type AuditLogAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "SOFT_DELETE"
  | "RESTORE"
  | "LOGIN"
  | "LOGOUT"
  | "LOGIN_FAILED"
  | "STATUS_CHANGE"
  | "STUDENT_ATTENDANCE_MARKED"
  | "STUDENT_ATTENDANCE_UPDATED"
  | "STUDENT_ATTENDANCE_FINALIZED"
  | "STUDENT_ATTENDANCE_REOPENED"
  | "TEACHER_ATTENDANCE_MARKED"
  | "TEACHER_ATTENDANCE_UPDATED"
  | "TEACHER_ATTENDANCE_FINALIZED"
  | "TEACHER_ATTENDANCE_REOPENED"
  | "STAFF_ATTENDANCE_MARKED"
  | "STAFF_ATTENDANCE_UPDATED"
  | "STAFF_ATTENDANCE_FINALIZED"
  | "STAFF_ATTENDANCE_REOPENED";

export type AuditLogEntity =
  | "Student"
  | "Teacher"
  | "Employee"
  | "Class"
  | "Subject"
  | "Session"
  | "Exam"
  | "Fee"
  | "Campus"
  | "School"
  | "User"
  | "Settings"
  | "Certificate"
  | "Attendance"
  | "Timetable"
  | "Leave"
  | "Salary"
  | "Plan";

export interface AuditLogFilters {
  action?: string;
  entity?: string;
  userId?: string;
  campusId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

