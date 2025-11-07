import { getEmployeeByIdApi } from "@/api/employees";
import { useQuery } from "@tanstack/react-query";

export function useEmployee(employeeId: string | undefined) {
  const {
    data,
    isPending: isEmployeeLoading,
    error: employeeError,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeByIdApi(employeeId!),
    enabled: !!employeeId,
  });

  const employee = data?.data?.employee;

  return { employee, isEmployeeLoading, employeeError };
}

