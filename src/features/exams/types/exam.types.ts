export interface Exam {
  _id: string;
  name: string;
  sessionId: string | {
    _id: string;
    name: string;
    startDate?: string;
    endDate?: string;
  };
  startDate?: string | null;
  endDate?: string | null;
  schoolId: string;
  campusId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateExamInput {
  name: string;
  sessionId: string;
  startDate?: string | null;
  endDate?: string | null;
}

export interface UpdateExamInput {
  name?: string;
  startDate?: string | null;
  endDate?: string | null;
}

export interface Mark {
  _id: string;
  examId: string | {
    _id: string;
    name: string;
  };
  classId: string | {
    _id: string;
    name: string;
  };
  subjectId: string | {
    _id: string;
    name: string;
  };
  studentId: string | {
    _id: string;
    name: string;
    rollNumber?: string;
  };
  obtainedMarks: number;
  totalMarks: number;
  schoolId: string;
  campusId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMarkInput {
  examId: string;
  classId: string;
  subjectId: string;
  studentId: string;
  obtainedMarks: number;
  totalMarks: number;
}

export interface BulkMarkEntry {
  studentId: string;
  obtainedMarks: number;
  totalMarks: number;
}

export interface BulkCreateMarksInput {
  examId: string;
  classId: string;
  subjectId: string;
  marks: BulkMarkEntry[];
}

