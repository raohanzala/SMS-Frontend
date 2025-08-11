import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../../api/students";

export function useStudent() {
  const { studentId } = useParams(); // get `id` from URL

  console.log(studentId)
  const { isPending, error, data } = useQuery({
    queryKey: ["students", studentId],
    queryFn: () => getStudentById(studentId), // pass id to API function
    enabled: !!studentId, // only fetch if id exists
    keepPreviousData: true,
  });

  return { student: data?.data, isPending, error };
}
