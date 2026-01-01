import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllSchoolsApi } from '@/api/schools';

export function useSchools() {
  const [searchParams] = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const isActive = searchParams.get("isActive");
  const plan = searchParams.get("plan") || "";

  const {
    isPending: isSchoolsLoading,
    error: schoolsError,
    data,
  } = useQuery({
    queryKey: ['schools', page, limit, search, isActive, plan],
    queryFn: () => getAllSchoolsApi({
      page,
      limit,
      search: search || undefined,
      isActive: isActive ? isActive === "true" : undefined,
      plan: plan || undefined,
    }),
  });

  const { schools, pagination } = data?.data || {};
  
  return { 
    schools, 
    pagination, 
    isSchoolsLoading, 
    schoolsError 
  };
}

