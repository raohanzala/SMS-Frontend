import { getAllEmployeesApi } from "@/api/employees";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useEmployees() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const search = searchParams.get("search") || "";

  const {
    isPending: isEmployeesLoading,
    error: employeesError,
    data,
  } = useQuery({
    queryKey: ["employees", page, limit, sortBy, search],
    queryFn: () =>
      getAllEmployeesApi({
        page,
        limit,
        search,
        sortBy,
      }),
  });

  const { employees, pagination } = data?.data || {};

  return { employees, pagination, isEmployeesLoading, employeesError };
}

