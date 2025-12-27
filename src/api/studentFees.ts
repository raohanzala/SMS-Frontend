import axiosInstance from "./axiosInstance";

// Types
export interface StudentFee {
  _id: string;
  studentId: string | {
    _id: string;
    name: string;
    rollNumber?: string;
  };
  sessionId: string | {
    _id: string;
    name: string;
  };
  month: string;
  year: number;
  amount: number;
  paidAmount: number;
  status: "PENDING" | "PARTIAL" | "PAID";
  dueDate: string;
  paidOn?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GenerateMonthlyFeesInput {
  month: string;
  year: number;
  classId?: string;
  sessionId: string;
}

export interface PayFeeInput {
  paidAmount: number;
}

export interface FeeReportResponse {
  fees: StudentFee[];
  statistics: {
    total: number;
    paid: number;
    partial: number;
    pending: number;
    totalAmount: number;
    totalPaid: number;
    totalPending: number;
  };
}

// Generate Monthly Fees
export const generateMonthlyFeesApi = async (
  payload: GenerateMonthlyFeesInput
): Promise<{
  success: boolean;
  message: string;
  data: {
    generated: number;
    skipped: number;
    total: number;
  };
}> => {
  const { data } = await axiosInstance.post("/fees/students/generate", payload);
  return data;
};

// Get Student Fees
export const getStudentFeesApi = async (
  studentId?: string,
  sessionId?: string,
  month?: string,
  year?: number
): Promise<{
  success: boolean;
  message: string;
  data: StudentFee[];
}> => {
  const { data } = await axiosInstance.get("/fees/students", {
    params: {
      ...(studentId && { studentId }),
      ...(sessionId && { sessionId }),
      ...(month && { month }),
      ...(year && { year }),
    },
  });
  return data;
};

// Pay Fee
export const payFeeApi = async (
  feeId: string,
  payload: PayFeeInput
): Promise<{
  success: boolean;
  message: string;
  data: StudentFee;
}> => {
  const { data } = await axiosInstance.post(`/fees/students/${feeId}/pay`, payload);
  return data;
};

// Get Fee Report
export const getFeeReportApi = async (
  classId?: string,
  month?: string,
  year?: number,
  sessionId?: string
): Promise<{
  success: boolean;
  message: string;
  data: FeeReportResponse;
}> => {
  const { data } = await axiosInstance.get("/fees/students/report", {
    params: {
      ...(classId && { classId }),
      ...(month && { month }),
      ...(year && { year }),
      ...(sessionId && { sessionId }),
    },
  });
  return data;
};

