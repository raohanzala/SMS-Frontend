import { useQuery } from "@tanstack/react-query";
import { getExamsApi } from "@/api/exams";

export function useExams(sessionId?: string | null) {
  const {
    isPending: isExamsLoading,
    error: examsError,
    data,
  } = useQuery({
    queryKey: ["exams", sessionId],
    queryFn: () => getExamsApi(sessionId || undefined),
    enabled: true,
  });

  const exams = data?.data || [];

  return { exams, isExamsLoading, examsError };
}

