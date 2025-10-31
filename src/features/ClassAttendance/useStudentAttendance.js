import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAttendanceByClass } from "../../api/attendance";

export function useStudentAttendance() {
  const [params] = useSearchParams();
  const classId = params.get("classId");
  const date = params.get("date");

  const { data, isPending, error } = useQuery({
    queryKey: ["attendance", classId, date],
    queryFn: () => getAttendanceByClass(classId, date),
    enabled: !!classId && !!date,
    keepPreviousData: true,
  });

  const { students, totalStudents } = data || {};
  return { students, totalStudents, isPending, error };
}
