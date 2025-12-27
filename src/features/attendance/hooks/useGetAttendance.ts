import { useQuery } from "@tanstack/react-query";
import { getAttendanceByClassAndDateApi } from "@/api/attendance";

export function useGetAttendance(classId: string | null, date: string | null) {
  const {
    isPending: isAttendanceLoading,
    error: attendanceError,
    data,
  } = useQuery({
    queryKey: ["attendance", classId, date],
    queryFn: () => getAttendanceByClassAndDateApi(classId!, date!),
    enabled: !!classId && !!date,
  });

  const attendance = data?.data;
  const students = attendance?.students || [];
  const statistics = attendance?.statistics || {
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    notMarked: 0,
  };
  const isFinalized = attendance?.isFinalized || false;

  return { attendance, students, statistics, isFinalized, isAttendanceLoading, attendanceError };
}

