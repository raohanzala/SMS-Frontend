export interface SubjectItem {
  name: string;
  totalMarks: number;
}

export interface Subject {
  _id: string;
  class: string; // class ID
  subjects: SubjectItem[];
  createdAt?: string;
  updatedAt?: string;
}
