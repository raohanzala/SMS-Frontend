import { getStudentsByClassAndSessionApi } from "@/api/students";
import { useQuery } from "@tanstack/react-query";

export function useStudentsByClassAndSession(classId: string | null, session: string) {
  const {
    isPending: isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ["studentsByClassAndSession", classId, session],
    queryFn: () => getStudentsByClassAndSessionApi({ classId: classId!, session }),
    enabled: !!classId && !!session,
  });

  const students = data?.data?.students || [];
  return { students, isLoading, error };
}

