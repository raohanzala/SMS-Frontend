import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAuditLogsApi, getAuditLogActionsApi, AuditLogFilters } from "@/api/auditLogs";

export function useAuditLogs(filters?: Partial<AuditLogFilters>) {
  const [searchParams] = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const action = searchParams.get("action") || filters?.action;
  const entity = searchParams.get("entity") || filters?.entity;
  const userId = searchParams.get("userId") || filters?.userId;
  const campusId = searchParams.get("campusId") || filters?.campusId;
  const fromDate = searchParams.get("fromDate") || filters?.fromDate;
  const toDate = searchParams.get("toDate") || filters?.toDate;

  const queryFilters: AuditLogFilters = {
    page,
    limit,
    ...(action && { action }),
    ...(entity && { entity }),
    ...(userId && { userId }),
    ...(campusId && { campusId }),
    ...(fromDate && { fromDate }),
    ...(toDate && { toDate }),
  };

  const {
    isPending: isAuditLogsLoading,
    error: auditLogsError,
    data,
  } = useQuery({
    queryKey: ["auditLogs", queryFilters],
    queryFn: () => getAuditLogsApi(queryFilters),
  });

  const { auditLogs, pagination } = data?.data || {};
  
  return { 
    auditLogs, 
    pagination, 
    isAuditLogsLoading, 
    auditLogsError 
  };
}

export function useAuditLogActions() {
  const {
    isPending: isActionsLoading,
    error: actionsError,
    data,
  } = useQuery({
    queryKey: ["auditLogActions"],
    queryFn: getAuditLogActionsApi,
  });

  const actions = data?.data?.actions || [];
  
  return { 
    actions, 
    isActionsLoading, 
    actionsError 
  };
}

