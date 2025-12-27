import axiosInstance from "./axiosInstance";

// Types
export interface SalarySlip {
  _id: string;
  employeeType: "TEACHER" | "STAFF";
  employeeId: string;
  employee?: {
    _id: string;
    name: string;
    designation?: string;
  };
  month: string;
  year: number;
  basicSalary: number;
  deductions: number;
  netSalary: number;
  status: "UNPAID" | "PAID";
  schoolId: string;
  campusId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GenerateSalaryInput {
  month: string;
  year: number;
  employeeType: "TEACHER" | "STAFF";
  employeeId?: string;
}

// Generate Salary
export const generateSalaryApi = async (
  payload: GenerateSalaryInput
): Promise<{
  success: boolean;
  message: string;
  data: {
    generated: number;
    skipped: number;
    total: number;
  };
}> => {
  const { data } = await axiosInstance.post("/salary/generate", payload);
  return data;
};

// Get Salary Slips
export const getSalarySlipsApi = async (
  employeeId?: string,
  employeeType?: string,
  month?: string,
  year?: number
): Promise<{
  success: boolean;
  message: string;
  data: SalarySlip[];
}> => {
  const { data } = await axiosInstance.get("/salary", {
    params: {
      ...(employeeId && { employeeId }),
      ...(employeeType && { employeeType }),
      ...(month && { month }),
      ...(year && { year }),
    },
  });
  return data;
};

// Mark Salary as Paid
export const markSalaryPaidApi = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  data: SalarySlip;
}> => {
  const { data } = await axiosInstance.post(`/salary/${id}/pay`);
  return data;
};

