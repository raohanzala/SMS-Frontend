import axiosInstance from "./axiosInstance";

// Types
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

// Create/Update Mark
export const createMarkApi = async (
  payload: CreateMarkInput
): Promise<{
  success: boolean;
  message: string;
  data: Mark;
}> => {
  const { data } = await axiosInstance.post("/marks", payload);
  return data;
};

// Bulk Create/Update Marks
export const bulkCreateMarksApi = async (
  payload: BulkCreateMarksInput
): Promise<{
  success: boolean;
  message: string;
  data: {
    created: number;
    updated: number;
    total: number;
  };
}> => {
  const { data } = await axiosInstance.post("/marks/bulk", payload);
  return data;
};

// Get Marks
export const getMarksApi = async (
  examId?: string,
  classId?: string,
  subjectId?: string,
  studentId?: string
): Promise<{
  success: boolean;
  message: string;
  data: Mark[];
}> => {
  const { data } = await axiosInstance.get("/marks", {
    params: {
      ...(examId && { examId }),
      ...(classId && { classId }),
      ...(subjectId && { subjectId }),
      ...(studentId && { studentId }),
    },
  });
  return data;
};

