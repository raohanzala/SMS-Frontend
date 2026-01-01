export interface PlanFeatures {
  maxStudents?: number;
  maxTeachers?: number;
  maxCampuses?: number;
  attendance?: boolean;
  exams?: boolean;
  fees?: boolean;
  payroll?: boolean;
  certificates?: boolean;
}

export interface Plan {
  _id: string;
  name: string;
  price: number;
  currency: string;
  features: PlanFeatures;
  billingCycle: "MONTHLY" | "YEARLY";
  code?: "FREE" | "BASIC" | "PRO" | "ENTERPRISE";
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePlanInput {
  name: string;
  code?: "FREE" | "BASIC" | "PRO" | "ENTERPRISE";
  price: number;
  currency?: string;
  features?: PlanFeatures;
  billingCycle?: "MONTHLY" | "YEARLY" | "WEEKLY" | "DAILY";
  isActive?: boolean;
}

export interface UpdatePlanInput {
  name?: string;
  code?: "FREE" | "BASIC" | "PRO" | "ENTERPRISE";
  price?: number;
  currency?: string;
  features?: PlanFeatures;
  billingCycle?: "MONTHLY" | "YEARLY" | "WEEKLY" | "DAILY";
  isActive?: boolean;
}

