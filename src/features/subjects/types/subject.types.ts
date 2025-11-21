export interface Subject {
  _id: string;
  classId: string;
  subjectTeacherId: string;
  totalMarks: number;
  subjectName: string;
}

export interface Subject {
  _id: string;
  subjectName: string;
  monthlyFee?: number;
  classTeacher?: {
    _id: string;
    name: string;
    email?: string;
    profileImage?: string;
  };
  subjects: Subject[];
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
