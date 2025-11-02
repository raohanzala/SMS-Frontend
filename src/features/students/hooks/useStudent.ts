import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStudentByIdApi } from "@/api/students";

export function useStudent() {
  const { studentId } = useParams();

  const { isPending: isLoadingStudent, error: studentError, data } = useQuery({
    queryKey: ["students", studentId],
    queryFn: () => getStudentByIdApi(studentId), 
    enabled: !!studentId,
  });

  return { student: data?.data, isLoadingStudent, studentError };
}
