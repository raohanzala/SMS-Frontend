import { Class } from "@/features/classes/types/class.types";
import { Teacher } from "@/features/teachers/types/teacher.types";

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

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
  _id?: string;
  class: Class; 
  day: DayOfWeek;
  period: number;
  startTime: string;
  endTime: string;  
  subject: string; 
  teacher: Teacher; 
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  originalTeacher?: string | null;
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
  day: DayOfWeek;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacherId: string;
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  originalTeacherId?: string;
}

export interface UpdateTimetableInput {
  classId?: string;
  day?: DayOfWeek;
  period?: number;
  startTime?: string;
  endTime?: string;
  subject?: string;
  teacherId?: string;
  room?: string;
  notes?: string;
  isSubstitute?: boolean;
  originalTeacherId?: string;
}

