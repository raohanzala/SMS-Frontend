import { Student } from "./student.types";

export interface PromotionHistory {
  fromClass: string;
  toClass: string;
  fromSession: string;
  toSession: string;
  promotedOn: string;
}

export interface PromotionStudent extends Student {
  session?: string;
  promotionHistory?: PromotionHistory[];
}

export interface PromoteStudentsRequest {
  studentIds: string[];
  fromClass: string;
  toClass: string;
  fromSession: string;
  toSession: string;
}

export interface PromoteStudentsResponse {
  success: boolean;
  message: string;
  count: number;
}

export interface StudentsByClassAndSessionParams {
  classId: string;
  session: string;
}

