export const PAGE_SIZE = 10
export const APP_NAME = 'SchoolSYS'
export const CURRENCY = 'Rs. '

export const PERMISSIONS = {
  // ------------------ SCHOOL ------------------
  SCHOOL_VIEW: "school:view",
  SCHOOL_UPDATE: "school:update",

  // ------------------ USERS ------------------
  USER_CREATE: "user:create",
  USER_VIEW: "user:view",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",

  // ------------------ STUDENTS ------------------
  STUDENT_CREATE: "student:create",
  STUDENT_VIEW: "student:view",
  STUDENT_UPDATE: "student:update",
  STUDENT_DELETE: "student:delete",
  STUDENT_PROMOTE: "student:promote",
  STUDENT_ATTENDANCE: "student:attendance",

  // ------------------ TEACHERS ------------------
  TEACHER_CREATE: "teacher:create",
  TEACHER_VIEW: "teacher:view",
  TEACHER_UPDATE: "teacher:update",
  TEACHER_DELETE: "teacher:delete",
  TEACHER_ATTENDANCE: "teacher:attendance",

  // ------------------ STAFF ------------------
  STAFF_CREATE: "staff:create",
  STAFF_VIEW: "staff:view",
  STAFF_UPDATE: "staff:update",
  STAFF_DELETE: "staff:delete",
  STAFF_ATTENDANCE: "staff:attendance",

  // ------------------ PARENTS ------------------
  PARENT_CREATE: "parent:create",
  PARENT_VIEW: "parent:view",
  PARENT_UPDATE: "parent:update",
  PARENT_DELETE: "parent:delete",

  // ------------------ CLASSES & TIMETABLE ------------------
  CLASS_CREATE: "class:create",
  CLASS_VIEW: "class:view",
  CLASS_UPDATE: "class:update",
  CLASS_DELETE: "class:delete",
  TIMETABLE_MANAGE: "timetable:manage",

  // ------------------ SUBJECTS ------------------
  SUBJECT_CREATE: "subject:create",
  SUBJECT_VIEW: "subject:view",
  SUBJECT_UPDATE: "subject:update",
  SUBJECT_DELETE: "subject:delete",

  // ------------------ FINANCE ------------------
  FEES_VIEW: "fees:view",
  FEES_MANAGE: "fees:manage",
  SALARY_VIEW: "salary:view",
  SALARY_MANAGE: "salary:manage",

  // ------------------ EXAMS ------------------
  EXAMS_CREATE: "exam:create",
  EXAMS_VIEW: "exam:view",
  EXAMS_UPDATE: "exam:update",
  EXAMS_DELETE: "exam:delete",

  // ------------------ CERTIFICATES ------------------
  CERTIFICATE_CREATE: "certificate:create",
  CERTIFICATE_VIEW: "certificate:view",

  // ------------------ LEAVE ------------------
  LEAVE_CREATE: "leave:create",
  LEAVE_VIEW: "leave:view",
  LEAVE_APPROVE: "leave:approve",

  // ------------------ NOTIFICATIONS ------------------
  NOTIFICATION_CREATE: "notification:create",
  NOTIFICATION_VIEW: "notification:view",
  NOTIFICATION_SEND: "notification:send",

  // ------------------ SETTINGS ------------------
  SETTINGS_VIEW: "settings:view",
  SETTINGS_UPDATE: "settings:update",

  // ------------------ REPORTS ------------------
  REPORT_VIEW: "report:view",
};