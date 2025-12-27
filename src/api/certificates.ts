import axiosInstance from "./axiosInstance";

// Types
export interface Certificate {
  _id: string;
  studentId: string | {
    _id: string;
    name: string;
    rollNumber?: string;
  };
  type: "LEAVING" | "BONAFIDE" | "CHARACTER";
  issuedOn: string;
  issuedBy: string | {
    _id: string;
    email: string;
    role: string;
    name?: string;
  };
  schoolId: string;
  campusId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCertificateInput {
  studentId: string;
  type: "LEAVING" | "BONAFIDE" | "CHARACTER";
}

// Create Certificate
export const createCertificateApi = async (
  payload: CreateCertificateInput
): Promise<{
  success: boolean;
  message: string;
  data: Certificate;
}> => {
  const { data } = await axiosInstance.post("/certificates", payload);
  return data;
};

// Get Certificates
export const getCertificatesApi = async (
  studentId?: string,
  type?: string
): Promise<{
  success: boolean;
  message: string;
  data: Certificate[];
}> => {
  const { data } = await axiosInstance.get("/certificates", {
    params: {
      ...(studentId && { studentId }),
      ...(type && { type }),
    },
  });
  return data;
};

