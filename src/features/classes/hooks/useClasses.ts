import { getClassesApi } from '@/api/classes';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useClasses(searchInput?: string, isAll = false) {
  const [searchParams] = useSearchParams();
  const page = isAll ? 1 : (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const limit = 10; // Undefined is ignored in axios params
  // const sortBy = searchParams.get("sortBy") || "name-asc";
  // const classId = searchParams.get("classId") || "";
  // const section = searchParams.get("section") || "";
  // const sortOrder = searchParams.get("sortOrder") || "";
  const search = searchInput || searchParams.get("search") || "";

  const {
    isPending: isClassesLoading,
    error: classesError,
    data,
  } = useQuery({
    queryKey: ['classes', page, limit, search],
    queryFn: () => getClassesApi({ page, limit, search }),
  });

  const { classes, pagination } = data?.data || {};
  return { classes, pagination, isClassesLoading, classesError };
}
