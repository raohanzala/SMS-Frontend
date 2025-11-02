import { Class } from "@/features/classes/types/class.types";
import { Parent, User } from "../../../types/user.types";
import { Attendance } from "@/features/attendance/types/attendance.types";

export type Gender = 'male' | 'female' | 'other' | '';

export interface Student extends User {
  rollNumber: string;
  class: Class;
  parent?: Parent;
}

export interface AddStudentInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  gender?: Gender;
  rollNumber?: string;
  class?: string;
  parent?: string | null;
  profileImage?: File;
}


export interface UpdateStudentInput {
  name?: string;
  phone?: string;
  address?: string;
  gender?: Gender;
  rollNumber?: string;
  class?: string;
  parent?: string | null;
  password?: string;
  profileImage?: File;
}

export interface AssignClassToStudentRequest {
  classId: string;
}

export interface BulkStudentData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  gender?: Gender;
  rollNumber?: string;
  classId?: string;
  section?: string;
  parentId?: string;
  attendance?: Attendance[];
  // feesPaid?: any[];
}

export interface BulkAddStudentsRequest {
  students: BulkStudentData[];
}
