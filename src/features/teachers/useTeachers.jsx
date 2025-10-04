import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllTeachers } from "@/api/teachers";

export function useTeachers() {
  const [searchParams] = useSearchParams();

  const page = (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const limit = 10; // Undefined is ignored in axios params
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const classId = searchParams.get("classId") || "";
  const section = searchParams.get("section") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";


  const { isPending, error, data } = useQuery({
    queryKey: ["teachers", page, limit, sortBy, search],
    queryFn: () => getAllTeachers({ page, limit, search, classId, section, sortBy, sortOrder }),
    keepPreviousData: true,
  });

  const { teachers, pagination } = data?.data || {};
  console.log(data)

  return { teachers, pagination, isPending, error };

}