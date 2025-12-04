export interface Class {
  _id: string;
  name: string;
  monthlyFee?: number;
  classTeacher?: { _id: string; name: string; email?: string } | string;
  level: string;
  createdAt?: string;
  updatedAt?: string;
}
