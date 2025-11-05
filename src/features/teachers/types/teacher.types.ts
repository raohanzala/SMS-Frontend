import { User } from "../../../types/user.types";
import { Class } from "@/features/classes/types/class.types";

export interface Teacher extends User {
  subjects?: string[] | Array<{ _id: string; name: string }>;
  assignedClasses?: Class[] | string[];
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
  teacherGender?: "male" | "female";
  teacherSubjects?: string[];
  teacherAssignedClasses?: string[];
  teacherSalaryAmount?: number;
  teacherSalaryCurrency?: string;
  teacherProfileImage?: File;
}

export interface UpdateTeacherInput {
  name?: string;
  teacherPhone?: string;
  teacherAddress?: string;
  teacherGender?: "male" | "female";
  teacherSubjects?: string[];
  teacherAssignedClasses?: string[];
  teacherSalaryAmount?: number;
  teacherSalaryCurrency?: string;
}

