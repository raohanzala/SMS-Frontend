export interface SchoolOwner {
  _id: string;
  user: {
    _id: string;
    email: string;
    role: string;
    status?: string;
    isFirstLogin?: boolean;
    createdAt?: string;
    schoolId?: {
      _id: string;
      name: string;
      code: string;
      isActive: boolean;
    };
  } | string;
  schoolId: {
    _id: string;
    name: string;
    code: string;
    isActive: boolean;
    ownerId?: {
      _id: string;
      email: string;
      role: string;
    };
    createdAt?: string;
    updatedAt?: string;
  } | string | null;
  campusId: {
    _id: string;
    name: string;
    address?: string;
  } | string | null;
  name: string;
  phone?: string;
  address?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SchoolOwnerDetails extends SchoolOwner {
  school?: {
    _id: string;
    name: string;
    code: string;
    isActive: boolean;
    ownerId?: {
      _id: string;
      email: string;
      role: string;
    };
    createdAt?: string;
    updatedAt?: string;
  };
  subscription?: {
    _id: string;
    status: string;
    planId: {
      _id: string;
      name: string;
      price: number;
      features?: Record<string, unknown>;
    };
    startDate: string;
    endDate: string;
  };
  campusesCount?: number;
}

