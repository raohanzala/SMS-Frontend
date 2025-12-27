import { getSessionsApi } from '@/api/sessions';
import { Session } from '@/features/sessions/types/session.types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

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
  const activeSession = useMemo(() => {
    if (sessions && sessions.length > 0) {
      const active = sessions.find((s: Session) => s?.isActive);
      return active || sessions[0];
    }
    return null;
  }, [sessions]);
  return { sessions: sessions || [], activeSession, isSessionsLoading, sessionsError };
}


