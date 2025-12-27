import { useQuery } from "@tanstack/react-query";
import { getFeeReportApi } from "@/api/studentFees";

export function useFeeReport(
  classId?: string | null,
  month?: string | null,
  year?: number | null,
  sessionId?: string | null
) {
  const {
    isPending: isReportLoading,
    error: reportError,
    data,
  } = useQuery({
    queryKey: ["feeReport", classId, month, year, sessionId],
    queryFn: () => getFeeReportApi(
      classId || undefined,
      month || undefined,
      year || undefined,
      sessionId || undefined
    ),
    enabled: true,
  });

  const report = data?.data;

  return { report, isReportLoading, reportError };
}

