import { Gender, User } from "../../../types/user.types";
import { Student } from "../../students/types/student.types";

export interface Parent extends User {
  children?: Student[];
  occupation?: string;
}

export interface AddParentInput {
  parentName: string;
  parentEmail?: string;
  parentPhone: string;
  parentAddress?: string;
  parentGender: Gender;
  occupation?: string;
  parentChildrenIds?: string[];
}

export interface UpdateParentInput {
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  parentAddress?: string;
  parentGender?: Gender;
  occupation?: string;
  parentChildrenIds?: string[];
}