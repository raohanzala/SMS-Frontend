import { getStudentsByClassAndSessionApi } from "@/api/students";
import { useQueries } from "@tanstack/react-query";

export function useStudentsByClassesAndSession(classIds: string[], sessionId: string) {
  const queries = useQueries({
    queries: classIds.map((classId) => ({
      queryKey: ["studentsByClassAndSession", classId, sessionId],
      queryFn: () => getStudentsByClassAndSessionApi({ classId, session: sessionId }),
      enabled: !!classId && !!sessionId && classIds.length > 0,
    })),
  });

  const isLoading = queries.some((query) => query.isPending);
  const error = queries.find((query) => query.error)?.error || null;
  const allStudents = queries
    .map((query) => query.data?.data?.students || [])
    .flat();

  // Remove duplicates based on _id
  const uniqueStudents = Array.from(
    new Map(allStudents.map((student) => [student._id, student])).values()
  );

  return { students: uniqueStudents, isLoading, error };
}


