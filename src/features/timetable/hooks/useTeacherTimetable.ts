import { getTeacherTimetableApi } from "@/api/timetable";
import { useQuery } from "@tanstack/react-query";

export function useTeacherTimetable(teacherId: string | null) {
  const {
    isPending: isTeacherTimetableLoading,
    error: teacherTimetableError,
    data,
  } = useQuery({
    queryKey: ["teacherTimetable", teacherId],
    queryFn: () => getTeacherTimetableApi(teacherId!),
    enabled: !!teacherId,
  });

  const teacherTimetable = data?.data;
  return { teacherTimetable, isTeacherTimetableLoading, teacherTimetableError };
}

