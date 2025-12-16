export interface Session {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddSessionInput {
  name: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

export interface UpdateSessionInput {
  name?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

