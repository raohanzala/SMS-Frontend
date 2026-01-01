export interface School {
  _id: string;
  name: string;
  code: string;
  ownerId: {
    _id: string;
    email: string;
    role: string;
    status?: string;
  } | string;
  plan?: string;
  isActive: boolean;
  subscription?: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchoolInput {
  name: string;
  code?: string;
  planId?: string;
}

export interface UpdateSchoolInput {
  name?: string;
  plan?: string;
  isActive?: boolean;
}

