import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllStudents } from "@/api/students";

export function useStudents({ unassigned = false, parentId = null } = {}) {
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
      getAllStudents({
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
    keepPreviousData: true,
  });

  const { students, pagination } = data?.data || {};

  return { students, pagination, isStudentsLoading, studentsError };
}
