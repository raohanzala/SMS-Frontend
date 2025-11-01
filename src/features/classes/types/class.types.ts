export interface Class {
  _id: string;
  name: string;
  section: string;
  subjects: string[]; // subject IDs
  assignedTeachers: string[]; // teacher IDs
  createdAt?: string;
  updatedAt?: string;
}
