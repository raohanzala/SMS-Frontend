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
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  studentAddress?: string;
  studentGender?: Gender;
  studentRollNumber?: string;
  studentClassId: string; 
  studentParentId?: string | null;
  studentProfileImage?: File;
  studentReligion?: string;
  studentDOB?: string;
  studentNationalId?: string;
  studentPassword?: string;
}

export interface UpdateStudentInput {
  name?: string;
  studentPhone?: string;
  studentAddress?: string;
  studentGender?: Gender;
  studentRollNumber?: string;
  studentClass?: string;
  studentParent?: string | null;
  studentPassword?: string;
  studentProfileImage?: File;
  studentReligion?: string;
  studentDOB?: string;
  studentNationalId?: string;
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
