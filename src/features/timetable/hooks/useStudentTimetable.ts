import { getStudentTimetableApi } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";

export function useStudentTimetable(studentId: string | null) {
  const {
    isPending: isStudentTimetableLoading,
    error: studentTimetableError,
    data,
  } = useQuery({
    queryKey: ["studentTimetable", studentId],
    queryFn: () => getStudentTimetableApi(studentId!),
    enabled: !!studentId,
  });

  const studentTimetable = data?.data;
  return { studentTimetable, isStudentTimetableLoading, studentTimetableError };
}

