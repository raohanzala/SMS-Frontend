import { useQuery } from '@tanstack/react-query';
import { getAllClasses } from '../../api/classes';
import { useSearchParams } from 'react-router-dom';

export function useClasses(isAll = false) {
  const [searchParams] = useSearchParams();
  const page = isAll ? 1 : (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const limit = 10; // Undefined is ignored in axios params
  // const sortBy = searchParams.get("sortBy") || "name-asc";
  // const classId = searchParams.get("classId") || "";
  // const section = searchParams.get("section") || "";
  // const sortOrder = searchParams.get("sortOrder") || "";
  // const search = searchParams.get("search") || "";

  const { data, isPending, error } = useQuery({
    queryKey: ['classes', page, limit],
    queryFn: () => getAllClasses(page, limit),
  });

  const { classes, pagination } = data?.data || {};
  return { classes, pagination, isPending, error };
}
