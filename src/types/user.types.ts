export type UserRole = "admin" | "teacher" | "student" | "parent";
export type Gender = "male" | "female";

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  profileImage?: string;
  gender: Gender;
  isFirstLogin?: boolean;
  religion?: string;
  DOB?: string;
  nationalId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Admin extends User {
  permissions?: string[];
}

export interface Parent extends User {
  children?: string[]; // Array of student IDs
}
