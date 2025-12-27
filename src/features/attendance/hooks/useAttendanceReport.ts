import { useQuery } from "@tanstack/react-query";
import { getAttendanceReportApi } from "@/api/attendance";

export function useAttendanceReport(studentId: string | null, from: string | null, to: string | null) {
  const {
    isPending: isReportLoading,
    error: reportError,
    data,
  } = useQuery({
    queryKey: ["attendanceReport", studentId, from, to],
    queryFn: () => getAttendanceReportApi(studentId!, from!, to!),
    enabled: !!studentId && !!from && !!to,
  });

  const report = data?.data;

  return { report, isReportLoading, reportError };
}

