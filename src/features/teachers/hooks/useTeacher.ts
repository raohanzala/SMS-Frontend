import { getTeacherByIdApi } from "@/api/teachers";
import { useQuery } from "@tanstack/react-query";

export function useTeacher(teacherId: string | undefined) {
  const {
    data,
    isPending: isTeacherLoading,
    error: teacherError,
  } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => getTeacherByIdApi(teacherId!),
    enabled: !!teacherId,
  });

  const teacher = data?.data;

  return { teacher, isTeacherLoading, teacherError };
}

