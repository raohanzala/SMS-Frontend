import { Student } from "@/features/students/types/student.types";

export interface Parent {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  occupation?: string;
  income?: number;
  nationalId?: string;
  children?: Student[];
}

export interface AddParentInput {
  name: string;
  phone: string;
  email?: string;
  occupation?: string;
  income?: number;
  nationalId?: string;
  childrenIds?: string[];
}

export interface UpdateParentInput {
  name?: string;
  phone?: string;
  email?: string;
  occupation?: string;
  income?: number;
  nationalId?: string;
  childrenIds?: string[];
}



