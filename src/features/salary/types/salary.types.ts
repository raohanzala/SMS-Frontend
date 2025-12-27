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

