import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllParentsApi } from "@/api/parents";

export function useParents(searchInput?: string, isAll = false) {
  const [searchParams] = useSearchParams();

  const page = isAll ? 1 : (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const limit = 10;
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const classId = searchParams.get("classId") || "";
  const section = searchParams.get("section") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchInput || searchParams.get("search") || "";

  const { isPending : isParentsLoading, error: parentsError, data } = useQuery({
    queryKey: ["parents", page, limit, sortBy, search],
    queryFn: () => getAllParentsApi({ page, limit, search, classId, section, sortBy, sortOrder }),
  });

  const { parents, pagination } = data?.data || {};

  return { parents, pagination, isParentsLoading, parentsError };

}