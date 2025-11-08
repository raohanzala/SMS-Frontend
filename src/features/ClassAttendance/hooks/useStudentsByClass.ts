import { useQuery } from "@tanstack/react-query";
import { StudentsByClassResponse } from "../types/attendance.types";
import { getStudentsByClassForAttendanceApi } from "@/api/attendance";

export const useStudentsByClass = (classId: string | null, date?: string | null) => {
  const {
    data,
    isLoading: isStudentsLoading,
    error: studentsError,
    refetch,
  } = useQuery<{
    success: boolean;
    message: string;
    data: StudentsByClassResponse;
  }>({
    queryKey: ["studentsByClass", classId, date],
    queryFn: () => {
      if (!classId) {
        throw new Error("Class ID is required");
      }
      return getStudentsByClassForAttendanceApi(classId, date || undefined);
    },
    enabled: !!classId,
  });

  return {
    studentsData: data?.data,
    isStudentsLoading,
    studentsError: studentsError as Error | null,
    refetch,
  };
};

