import { getSessionsApi } from '@/api/sessions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useSessions(searchInput?: string, isAll = false) {
  const [searchParams] = useSearchParams();
  const page = isAll ? 1 : (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const limit = 10;
  const search = searchInput || searchParams.get("search") || "";

  const {
    isPending: isSessionsLoading,
    error: sessionsError,
    data,
  } = useQuery({
    queryKey: ['sessions', page, limit, search],
    queryFn: () => getSessionsApi({ page, limit, search }),
  });

  const { sessions, pagination } = data?.data || {};
  return { sessions, pagination, isSessionsLoading, sessionsError };
}

