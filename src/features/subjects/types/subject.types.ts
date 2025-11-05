export interface SubjectItem {
  name: string;
  totalMarks: number;
}

export interface Subject {
  _id: string;
  class?: string | { _id: string; name: string; section: string }; // class ID or populated class
  subjects: SubjectItem[];
  assignedTeacher?: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  code?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddSubjectInput {
  class: string;
  subjects: SubjectItem[];
}

export interface UpdateSubjectInput {
  class?: string;
  subjects?: SubjectItem[];
}
