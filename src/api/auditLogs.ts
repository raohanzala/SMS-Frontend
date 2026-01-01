import axiosInstance from "./axiosInstance";

export interface AuditLogUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuditLogCampus {
  _id: string;
  name: string;
}

export interface AuditLogSchool {
  _id: string;
  name: string;
}

export interface AuditLog {
  _id: string;
  action: string;
  entity: string;
  entityId: string;
  userId: AuditLogUser | string;
  campusId: AuditLogCampus | string | null;
  schoolId: AuditLogSchool | string;
  ipAddress?: string;
  userAgent?: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

export interface AuditLogFilters {
  action?: string;
  entity?: string;
  userId?: string;
  campusId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export interface AuditLogPagination {
  currentPage: number;
  totalPages: number;
  totalLogs: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AuditLogsResponse {
  success: boolean;
  message: string;
  data: {
    auditLogs: AuditLog[];
    pagination: AuditLogPagination;
  };
}

export interface AuditLogResponse {
  success: boolean;
  message: string;
  data: AuditLog;
}

export interface AuditLogActionsResponse {
  success: boolean;
  message: string;
  data: {
    actions: string[];
  };
}

// Get audit logs with filters
export const getAuditLogsApi = async (
  filters?: AuditLogFilters
): Promise<AuditLogsResponse> => {
  const params = new URLSearchParams();
  
  if (filters?.action) params.append("action", filters.action);
  if (filters?.entity) params.append("entity", filters.entity);
  if (filters?.userId) params.append("userId", filters.userId);
  if (filters?.campusId) params.append("campusId", filters.campusId);
  if (filters?.fromDate) params.append("fromDate", filters.fromDate);
  if (filters?.toDate) params.append("toDate", filters.toDate);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const { data } = await axiosInstance.get(`/audit-logs?${params.toString()}`);
  return data;
};

// Get single audit log by ID
export const getAuditLogByIdApi = async (
  id: string
): Promise<AuditLogResponse> => {
  const { data } = await axiosInstance.get(`/audit-logs/${id}`);
  return data;
};

// Get available action types
export const getAuditLogActionsApi = async (): Promise<AuditLogActionsResponse> => {
  const { data } = await axiosInstance.get("/audit-logs/meta/actions");
  return data;
};

