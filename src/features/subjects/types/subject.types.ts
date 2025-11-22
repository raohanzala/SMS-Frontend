import { Class } from "@/features/classes/types/class.types";
import { Teacher } from "@/features/teachers/types/teacher.types";

export interface Subject {
  _id: string;
  class: Class;
  teacher: Teacher;
  examMarks: number;
  name: string;
}

// export interface Subject {
//   _id: string;
//   subjectName: string;
//   monthlyFee?: number;
//   classTeacher?: {
//     _id: string;
//     name: string;
//     email?: string;
//     profileImage?: string;
//   };
//   subjects: Subject[];
//   createdAt?: string;
//   updatedAt?: string;
// }

export interface AddSubjectInput {
  classId: string;
  teacherId: string;
  name: string; 
  examMarks: number;
}

export interface UpdateSubjectInput {
  classId?: string;
  teacherId?: string;
  name: string;
  examMarks: number;
}
