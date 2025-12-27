import { useQuery } from "@tanstack/react-query";
import { getTeacherAttendanceByDateApi } from "@/api/teacherAttendance";

export function useGetTeacherAttendance(date: string | null) {
  const {
    isPending: isAttendanceLoading,
    error: attendanceError,
    data,
  } = useQuery({
    queryKey: ["teacherAttendance", date],
    queryFn: () => getTeacherAttendanceByDateApi(date!),
    enabled: !!date,
  });

  const attendance = data?.data;
	const teachers = attendance?.teachers || [];
	const statistics = attendance?.statistics || {
		total: 0,
		present: 0,
		absent: 0,
		late: 0,
		leave: 0,
		notMarked: 0,
	};
	const isFinalized = attendance?.isFinalized || false;

  return { attendance, teachers, statistics, isFinalized, isAttendanceLoading, attendanceError };
}

