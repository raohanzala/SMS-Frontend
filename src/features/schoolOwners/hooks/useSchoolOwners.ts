import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllSchoolOwnersApi } from '@/api/schoolOwners';

export function useSchoolOwners() {
  const [searchParams] = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const hasSchool = searchParams.get("hasSchool");

  const {
    isPending: isSchoolOwnersLoading,
    error: schoolOwnersError,
    data,
  } = useQuery({
    queryKey: ['schoolOwners', page, limit, search, status, hasSchool],
    queryFn: () => getAllSchoolOwnersApi({
      page,
      limit,
      search: search || undefined,
      status: status || undefined,
      hasSchool: hasSchool ? hasSchool === "true" : undefined,
    }),
  });

  const { owners, pagination } = data?.data || {};
  
  return { 
    owners, 
    pagination, 
    isSchoolOwnersLoading, 
    schoolOwnersError 
  };
}

