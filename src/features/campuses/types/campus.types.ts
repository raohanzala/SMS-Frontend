export interface Campus {
  _id: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCampusInput {
  name: string;
  code: string;
  address?: string;
  phone?: string;
}

export interface UpdateCampusInput {
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
}

export const isMainCampus = (campus: Campus): boolean => {
  return campus.code?.endsWith("-MAIN") || false;
};

