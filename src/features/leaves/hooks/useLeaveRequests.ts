import { useQuery } from "@tanstack/react-query";
import { getLeaveRequestsApi } from "@/api/leaves";

export function useLeaveRequests(userId?: string | null, status?: string | null) {
  const {
    isPending: isLeaveRequestsLoading,
    error: leaveRequestsError,
    data,
  } = useQuery({
    queryKey: ["leaveRequests", userId, status],
    queryFn: () => getLeaveRequestsApi(userId || undefined, status || undefined),
    enabled: true,
  });

  const leaveRequests = data?.data || [];

  return { leaveRequests, isLeaveRequestsLoading, leaveRequestsError };
}

