import axiosInstance from "./axiosInstance";

// Types
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

// Create Exam
export const createExamApi = async (
  payload: CreateExamInput
): Promise<{
  success: boolean;
  message: string;
  data: Exam;
}> => {
  const { data } = await axiosInstance.post("/exams", payload);
  return data;
};

// Get Exams
export const getExamsApi = async (
  sessionId?: string
): Promise<{
  success: boolean;
  message: string;
  data: Exam[];
}> => {
  const { data } = await axiosInstance.get("/exams", {
    params: sessionId ? { sessionId } : {},
  });
  return data;
};

// Update Exam
export const updateExamApi = async (
  id: string,
  payload: UpdateExamInput
): Promise<{
  success: boolean;
  message: string;
  data: Exam;
}> => {
  const { data } = await axiosInstance.put(`/exams/${id}`, payload);
  return data;
};

// Delete Exam
export const deleteExamApi = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  const { data } = await axiosInstance.delete(`/exams/${id}`);
  return data;
};

