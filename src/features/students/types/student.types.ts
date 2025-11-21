import { Class } from "@/features/classes/types/class.types";
import { Parent, User } from "../../../types/user.types";
import { Attendance } from "@/features/attendance/types/attendance.types";

export type Gender = "male" | "female" | "other" | "";

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
  gender: Gender;
  rollNumber?: string;
  classId: string;
  parentId?: string | null;
  profileImage?: File;
  religion?: string;
  DOB?: string;
  nationalId?: string;
  password?: string; // Only used on create
  session?: string;
}

export interface UpdateStudentInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: Gender;
  rollNumber?: string;
  classId?: string;
  parentId?: string | null;
  profileImage?: File;
  religion?: string;
  DOB?: string;
  nationalId?: string;
  password?: string; // optional, only update if changed
  session?: string;
}

export interface AssignClassToStudentRequest {
  classId: string;
}

export interface BulkStudentData {
  studentName: string;
  studentEmail: string;
  studentPassword: string;
  studentPhone?: string;
  studentAddress?: string;
  studentGender?: Gender;
  studentRollNumber?: string;
  classId?: string;
  studentSection?: string;
  studentParent?: string;
  attendance?: Attendance[];
}

export interface BulkAddStudentsRequest {
  students: BulkStudentData[];
}
