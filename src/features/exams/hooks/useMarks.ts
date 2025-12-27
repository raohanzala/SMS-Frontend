import { useQuery } from "@tanstack/react-query";
import { getMarksApi } from "@/api/marks";

export function useMarks(
  examId?: string | null,
  classId?: string | null,
  subjectId?: string | null,
  studentId?: string | null
) {
  const {
    isPending: isMarksLoading,
    error: marksError,
    data,
  } = useQuery({
    queryKey: ["marks", examId, classId, subjectId, studentId],
    queryFn: () => getMarksApi(
      examId || undefined,
      classId || undefined,
      subjectId || undefined,
      studentId || undefined
    ),
    enabled: true,
  });

  const marks = data?.data || [];

  return { marks, isMarksLoading, marksError };
}

