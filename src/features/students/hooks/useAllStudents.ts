import { getAllStudentsApi } from "@/api/students";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch all students without pagination for family tree view
 */
export function useAllStudents() {
  const {
    isPending: isStudentsLoading,
    error: studentsError,
    data,
  } = useQuery({
    queryKey: ["students", "all"],
    queryFn: () =>
      getAllStudentsApi({
        page: 1,
        limit: 10000, // Large limit to get all students
      }),
  });

  const { students } = data?.data || {};

  return { students: students || [], isStudentsLoading, studentsError };
}

