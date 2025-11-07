export interface Class {
  _id: string;
  name: string;
  monthlyTuitionFee?: number;
  classTeacher?: { _id: string; name: string; email?: string } | string;
  createdAt?: string;
  updatedAt?: string;
}
