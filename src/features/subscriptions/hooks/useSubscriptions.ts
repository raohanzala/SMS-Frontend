import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllSubscriptionsApi } from '@/api/subscriptions';

export function useSubscriptions() {
  const [searchParams] = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const status = searchParams.get("status") || "";
  const schoolId = searchParams.get("schoolId") || "";

  const {
    isPending: isSubscriptionsLoading,
    error: subscriptionsError,
    data,
  } = useQuery({
    queryKey: ['subscriptions', page, limit, status, schoolId],
    queryFn: () => getAllSubscriptionsApi({
      page,
      limit,
      status: status || undefined,
      schoolId: schoolId || undefined,
    }),
  });

  const { subscriptions, pagination } = data?.data || {};
  
  return { 
    subscriptions, 
    pagination, 
    isSubscriptionsLoading, 
    subscriptionsError 
  };
}

