import { Class } from "@/features/classes/types/class.types";
import { Teacher } from "@/features/teachers/types/teacher.types";

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export type DayOfWeekFull = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export interface TimetableEntry {
  _id: string;
  class: string | { _id: string; name: string };
  day: DayOfWeek;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string | { _id: string; name: string };
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  originalTeacher?: string | { _id: string; name: string };
  createdAt?: string;
  updatedAt?: string;
}


export interface Timetable {
  _id: string; // Period _id
  timetableDocId?: string; // Timetable document _id (for editing/deleting)
  class: Class | { _id: string; name: string }; 
  day: DayOfWeek | DayOfWeekFull;
  period: number;
  startTime: string;
  endTime: string;  
  subject: string; 
  subjectId?: { _id: string; name: string } | string; // Subject object or ID
  teacher: Teacher | { _id: string; name: string }; 
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  originalTeacher?: { _id: string; name: string } | string | null;
  createdAt?: string;
  updatedAt?: string;
}


export interface WeeklyTimetableGrid {
  Mon: TimetableEntry[];
  Tue: TimetableEntry[];
  Wed: TimetableEntry[];
  Thu: TimetableEntry[];
  Fri: TimetableEntry[];
  Sat: TimetableEntry[];
}

export interface ClassTimetableResponse {
  class: {
    _id: string;
    name: string;
  };
  timetable: WeeklyTimetableGrid;
  raw: TimetableEntry[];
}

export interface TeacherTimetableResponse {
  teacher: {
    _id: string;
    name: string;
  };
  timetable: WeeklyTimetableGrid;
  freePeriods: {
    Mon: number[];
    Tue: number[];
    Wed: number[];
    Thu: number[];
    Fri: number[];
    Sat: number[];
  };
  regularClasses: TimetableEntry[];
  substituteClasses: TimetableEntry[];
  raw: TimetableEntry[];
}

export interface StudentTimetableResponse {
  student: {
    _id: string;
    name: string;
    rollNumber?: string;
  };
  class: {
    _id: string;
    name: string;
  };
  timetable: WeeklyTimetableGrid;
  raw: TimetableEntry[];
}

export interface AddTimetableInput {
  classId: string;
  day: DayOfWeekFull;
  period: number;
  subjectId: string;
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  substituteTeacherId?: string;
}

export interface UpdateTimetableInput {
  classId?: string;
  day?: DayOfWeekFull;
  period?: number;
  subjectId?: string;
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  substituteTeacherId?: string;
}

// Backend response structure
export interface TimetablePeriod {
  period: number;
  subjectId: { _id: string; name: string } | string;
  teacherId: { _id: string; name: string } | string;
  startTime: string;
  endTime: string;
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  originalTeacherId?: { _id: string; name: string } | string | null;
  _id: string;
}

export interface TimetableDay {
  day: DayOfWeekFull;
  periods: TimetablePeriod[];
  _id: string;
}

export interface TimetableBackendResponse {
  _id: string;
  classId: { _id: string; name: string } | string;
  academicYear?: string;
  timetable: TimetableDay[];
  createdAt?: string;
  updatedAt?: string;
}

