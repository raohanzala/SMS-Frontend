import { getAllStudentsApi } from "@/api/students";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useStudents(params?: { unassigned?: boolean, parentId?: string | null }) {
  const { unassigned = false, parentId = null } = params || {};
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const classId = searchParams.get("classId") || "";
  const section = searchParams.get("section") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("student") || "";

  const {
    isPending: isStudentsLoading,
    error: studentsError,
    data,
  } = useQuery({
    queryKey: ["students", page, limit, sortBy, search, unassigned, parentId],
    queryFn: () =>
      getAllStudentsApi({
        page,
        limit,
        search,
        classId,
        section,
        sortBy,
        sortOrder,
        unassigned,
        parentId,
      }),
  });

  const { students, pagination } = data?.data || {};

  return { students, pagination, isStudentsLoading, studentsError };
}
