import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "../../api/teachers";

export function useTeacher() {
  const { teacherId } = useParams(); // get `id` from URL

  console.log(teacherId)
  const { isPending, error, data } = useQuery({
    queryKey: ["teachers", teacherId],
    queryFn: () => getTeacherById(teacherId), // pass id to API function
    enabled: !!teacherId, // only fetch if id exists
    keepPreviousData: true,
  });

  return { teacher: data?.data, isPending, error };
}
