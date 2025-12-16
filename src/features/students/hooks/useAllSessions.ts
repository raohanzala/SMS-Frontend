import { getSessionsApi } from '@/api/sessions';
import { useQuery } from '@tanstack/react-query';

export function useAllSessions() {
  const {
    isPending: isSessionsLoading,
    error: sessionsError,
    data,
  } = useQuery({
    queryKey: ['sessions', 'all'],
    queryFn: () => getSessionsApi({ page: 1, limit: 1000, search: '' }),
  });

  const { sessions } = data?.data || {};
  return { sessions: sessions || [], isSessionsLoading, sessionsError };
}


