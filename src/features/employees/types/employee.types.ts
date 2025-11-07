import { User } from "../../../types/user.types";
import { Class } from "@/features/classes/types/class.types";

export type EmployeeDesignation = 'teacher' | 'principal' | 'accountant' | 'management' | 'admin' | 'other';

export interface Employee extends User {
  designation: EmployeeDesignation;
  experience?: string;
  education?: string;
  husband?: string;
  dateOfJoining?: string;
  assignedClasses?: Class[] | string[];
  timetable?: unknown[];
  salary?: {
    amount: number;
    currency: string;
    paymentHistory?: Array<{
      date?: string;
      amount: number;
      currency?: string;
    }>;
  };
}

export interface AddEmployeeInput {
  employeeName: string;
  employeeEmail: string;
  employeePhone?: string;
  employeeAddress?: string;
  employeeGender: "male" | "female";
  employeeDesignation: EmployeeDesignation;
  employeeExperience?: string;
  employeeEducation?: string;
  employeeHusband?: string;
  employeeDateOfJoining?: string;
  employeeAssignedClasses?: string[];
  employeeTimetable?: unknown[];
  employeeSalary?: {
    amount: number;
    currency: string;
  };
  employeeProfileImage?: File;
}

export interface UpdateEmployeeInput {
  employeeName?: string;
  employeeEmail?: string;
  employeePhone?: string;
  employeeAddress?: string;
  employeeGender?: "male" | "female";
  employeeDesignation?: EmployeeDesignation;
  employeeExperience?: string;
  employeeEducation?: string;
  employeeHusband?: string;
  employeeDateOfJoining?: string;
  employeeAssignedClasses?: string[];
  employeeTimetable?: unknown[];
  employeeSalary?: {
    amount: number;
    currency: string;
  };
  employeeProfileImage?: File;
}

