export interface Subscription {
  _id: string;
  schoolId: {
    _id: string;
    name: string;
    code: string;
    ownerId?: string;
  } | string;
  planId: {
    _id: string;
    name: string;
    price: number;
    features?: Record<string, any>;
    billingCycle?: string;
  } | string;
  status: "ACTIVE" | "TRIAL" | "EXPIRED" | "CANCELLED";
  startDate: string;
  endDate: string;
  trialEndsAt?: string;
  isTrial?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssignPlanInput {
  schoolId: string;
  planId: string;
  startDate?: string;
  endDate?: string;
  isTrial?: boolean;
}

