export interface FeeStructure {
  _id: string;
  classId: string | {
    _id: string;
    name: string;
  };
  monthlyFee: number;
  admissionFee: number;
  examFee: number;
  isActive: boolean;
  schoolId: string;
  campusId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFeeStructureInput {
  classId: string;
  monthlyFee: number;
  admissionFee?: number;
  examFee?: number;
}

export interface UpdateFeeStructureInput {
  monthlyFee?: number;
  admissionFee?: number;
  examFee?: number;
  isActive?: boolean;
}

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

