import { useQuery } from "@tanstack/react-query";
import { getStaffAttendanceByDateApi } from "@/api/staffAttendance";

export function useGetStaffAttendance(date: string | null, campusId?: string | null) {
  const {
    isPending: isAttendanceLoading,
    error: attendanceError,
    data,
  } = useQuery({
    queryKey: ["staffAttendance", date, campusId],
    queryFn: () => getStaffAttendanceByDateApi(date!, campusId || undefined),
    enabled: !!date,
  });

  const attendance = data?.data;
  const staff = attendance?.staff || [];
  const statistics = attendance?.statistics || {
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    halfDay: 0,
    notMarked: 0,
  };
  const isFinalized = attendance?.isFinalized || false;

  return { attendance, staff, statistics, isFinalized, isAttendanceLoading, attendanceError };
}

