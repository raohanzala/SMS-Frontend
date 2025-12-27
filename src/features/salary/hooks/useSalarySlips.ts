import { useQuery } from "@tanstack/react-query";
import { getSalarySlipsApi } from "@/api/salary";

export function useSalarySlips(
  employeeId?: string | null,
  employeeType?: string | null,
  month?: string | null,
  year?: number | null
) {
  const {
    isPending: isSalarySlipsLoading,
    error: salarySlipsError,
    data,
  } = useQuery({
    queryKey: ["salarySlips", employeeId, employeeType, month, year],
    queryFn: () => getSalarySlipsApi(
      employeeId || undefined,
      employeeType || undefined,
      month || undefined,
      year || undefined
    ),
    enabled: true,
  });

  const salarySlips = data?.data || [];

  return { salarySlips, isSalarySlipsLoading, salarySlipsError };
}

