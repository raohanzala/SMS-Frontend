import { useQuery } from "@tanstack/react-query";
import { getTeacherAttendanceReportApi } from "@/api/teacherAttendance";

export function useTeacherAttendanceReport(
  teacherId: string | null,
  from: string | null,
  to: string | null
) {
  const {
    isPending: isReportLoading,
    error: reportError,
    data,
  } = useQuery({
    queryKey: ["teacherAttendanceReport", teacherId, from, to],
    queryFn: () => getTeacherAttendanceReportApi(teacherId!, from!, to!),
    enabled: !!teacherId && !!from && !!to,
  });

  const report = data?.data;

  return { report, isReportLoading, reportError };
}

