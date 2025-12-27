import { useQuery } from "@tanstack/react-query";
import { getStudentFeesApi } from "@/api/studentFees";

export function useStudentFees(
  studentId?: string | null,
  sessionId?: string | null,
  month?: string | null,
  year?: number | null
) {
  const {
    isPending: isFeesLoading,
    error: feesError,
    data,
  } = useQuery({
    queryKey: ["studentFees", studentId, sessionId, month, year],
    queryFn: () => getStudentFeesApi(
      studentId || undefined,
      sessionId || undefined,
      month || undefined,
      year || undefined
    ),
    enabled: true,
  });

  const fees = data?.data || [];

  return { fees, isFeesLoading, feesError };
}

