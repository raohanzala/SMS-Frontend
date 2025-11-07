import { User } from "../../../types/user.types";
import { Class } from "@/features/classes/types/class.types";

export interface Teacher extends User {
  experience?: string;
  education?: string;
  husband?: string;
  dateOfJoining?: string;
  assignedClasses?: Class[] | string[];
  timetable?: unknown[];
  salary?: {
    amount: number;
    currency: string;
  };
}

export interface AddTeacherInput {
  teacherName: string;
  teacherEmail: string;
  teacherPhone?: string;
  teacherAddress?: string;
  teacherGender: "male" | "female";
  teacherExperience?: string;
  teacherEducation?: string;
  teacherHusband?: string;
  teacherDateOfJoining?: string;
  assignedClasses?: string[];
  teacherTimetable?: unknown[];
  teacherSalary?: {
    amount: number;
    currency: string;
  };
  teacherProfileImage?: File;
}

export interface UpdateTeacherInput {
  teacherName?: string;
  teacherEmail?: string;
  teacherPhone?: string;
  teacherAddress?: string;
  teacherGender?: "male" | "female";
  teacherExperience?: string;
  teacherEducation?: string;
  teacherHusband?: string;
  teacherDateOfJoining?: string;
  assignedClasses?: string[];
  teacherTimetable?: unknown[];
  teacherSalary?: {
    amount: number;
    currency: string;
  };
  teacherProfileImage?: File;
}

