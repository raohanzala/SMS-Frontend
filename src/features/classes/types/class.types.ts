export interface Class {
  _id: string;
  name: string;
  section: string;
  subjects?: Array<{ _id: string; name: string }> | string[]; // populated or IDs
  assignedTeachers?: Array<{ _id: string; name: string; email?: string; profileImage?: string }> | string[]; // populated or IDs
  createdAt?: string;
  updatedAt?: string;
}
