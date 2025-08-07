import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllAttendance } from '../../api/attendance';

export function useAttendance() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  const { data, isPending, error } = useQuery({
    queryKey: ['attendances', page, limit],
    queryFn: () => getAllAttendance(page, limit),
  });

  const { data: attendance, pagination } = data || {};
  return { attendance, pagination, isPending, error };
}
