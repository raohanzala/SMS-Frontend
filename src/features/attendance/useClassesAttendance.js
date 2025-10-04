import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getClassesAttendance } from '@/api/attendance';

export function useClassesAttendance() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  const { data, isPending, error } = useQuery({
    queryKey: ['attendances', page, limit],
    queryFn: () => getClassesAttendance(page, limit),
  });

  const { data: classes, pagination } = data || {};
  return { classes, pagination, isPending, error };
}
