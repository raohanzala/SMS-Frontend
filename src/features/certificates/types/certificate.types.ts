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

