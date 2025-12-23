export interface BreakTime {
  startTime?: string | null;
  duration?: number | null;
}

export interface PeriodConfig {
  periodDuration?: number | null;
  totalPeriods?: number | null;
  breakAfterPeriods?: number | null;
  breakDuration?: number | null;
}

export interface SchoolTiming {
  startTime: string;
  endTime: string;
}

export interface LevelTimings {
  startTime?: string | null;
  endTime?: string | null;
  breakTime?: BreakTime;
  periodConfig?: PeriodConfig;
}

export interface ClassLevel {
  name: string;
  timings?: LevelTimings;
  _id?: string;
}

export interface ClassWiseOverride {
  classId: string;
  startTime?: string;
  endTime?: string;
  breakTime?: BreakTime;
  periodConfig?: PeriodConfig;
  _id?: string;
}

// General Settings
export interface GeneralSettings {
  schoolName?: string;
  timezone?: string;
  locale?: string;
  workingDays?: string[];
  weekendDays?: string[];
}

// Academic Settings
export interface AcademicYear {
  startDate?: string | Date;
  endDate?: string | Date;
}

export interface AcademicSettings {
  academicYear?: AcademicYear;
  gradingSystem?: "percentage" | "gpa" | "custom";
  passPercentage?: number;
}

// Timetable Settings
export interface TimetableSettings {
  defaultSchoolTiming?: SchoolTiming;
  defaultPeriodConfig?: PeriodConfig;
  classLevels?: ClassLevel[];
  classWiseOverrides?: ClassWiseOverride[];
}

// Attendance Settings
export interface AttendanceSettings {
  autoMarkAbsentAfter?: number;
  allowLateEntry?: boolean;
  lateAfterMinutes?: number;
}

// Branding Settings
export interface BrandingSettings {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  theme?: "light" | "dark";
}

// Complete Settings
export interface Settings {
  _id: string;
  schoolId?: string;
  general?: GeneralSettings;
  academic?: AcademicSettings;
  timetable?: TimetableSettings;
  attendance?: AttendanceSettings;
  branding?: BrandingSettings;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  version?: number;
}

// Input types for API
export interface AddSettingsInput {
  general?: GeneralSettings;
  academic?: AcademicSettings;
  timetable?: TimetableSettings;
  attendance?: AttendanceSettings;
  branding?: BrandingSettings;
}

export interface UpdateSettingsInput {
  general?: GeneralSettings;
  academic?: AcademicSettings;
  timetable?: TimetableSettings;
  attendance?: AttendanceSettings;
  branding?: BrandingSettings;
}
