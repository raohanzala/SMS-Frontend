import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAttendanceByDate } from "../../api/attendance";

export function useEmployeesAttendance() {
  const [params] = useSearchParams();
  const date = params.get("date");

  const { data, isPending, error } = useQuery({
    queryKey: ["attendance", date],
    queryFn: () => getAttendanceByDate(date),
    enabled: !!date,
    keepPreviousData: true,
  });

  const { employees, totalEmployees } = data || {};
  return { employees, totalEmployees, isPending, error };
}
