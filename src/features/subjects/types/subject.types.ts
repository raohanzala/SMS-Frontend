export interface SubjectItem {
  _id: string;
  name: string;
  totalMarks: number;
}

export interface Subject {
  _id: string;
  name: string;
  monthlyFee?: number;
  classTeacher?: {
    _id: string;
    name: string;
    email?: string;
    profileImage?: string;
  };
  subjects: SubjectItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AddSubjectInput {
  classId: string;
  subjects: SubjectItem[];
}

export interface UpdateSubjectInput {
  classId?: string;
  subjects?: SubjectItem[];
}
