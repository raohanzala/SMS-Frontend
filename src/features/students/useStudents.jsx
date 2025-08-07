import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllStudents } from "../../api/students";

export function useStudents(isAll = false) {
  const [searchParams] = useSearchParams();
  // const queryClient = useQueryClient();

  const page = isAll ? 1 : (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const limit = 10; // Undefined is ignored in axios params
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const classId = searchParams.get("classId") || "";
  const section = searchParams.get("section") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchParams.get("search") || "";


  const { isPending, error, data } = useQuery({
    queryKey: ["students", page, limit, sortBy, search],
    queryFn: () => getAllStudents({ page, limit, search, classId, section, sortBy, sortOrder }),
    keepPreviousData: true,
  });

  const { students, pagination } = data?.data || {};
  console.log(data)

  return { students, pagination, isPending, error };

}