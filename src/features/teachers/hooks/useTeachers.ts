import { getAllTeachersApi } from "@/api/teachers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useTeachers() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const classId = searchParams.get("classId") || "";
  const section = searchParams.get("section") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";

  const {
    isPending: isTeachersLoading,
    error: teachersError,
    data,
  } = useQuery({
    queryKey: ["teachers", page, limit, sortBy, search],
    queryFn: () =>
      getAllTeachersApi({
        page,
        limit,
        search,
        classId,
        section,
        sortBy,
        sortOrder,
      }),
  });

  const { teachers, pagination } = data?.data || {};

  return { teachers, pagination, isTeachersLoading, teachersError };
}

