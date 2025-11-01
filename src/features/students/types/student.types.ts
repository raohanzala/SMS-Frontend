import { Class } from "@/features/classes/types/class.types";
import { Parent, User } from "../../../types/user.types";

export interface Student extends User {
  rollNumber: string;
  class: Class; // class ID or populated class object
  parent?: Parent; // parent ID or populated parent
}

export interface StudentPagination {
  students: Student[];
  total: number;
  page: number;
  limit: number;
}
