import { useQuery } from '@tanstack/react-query';
import { getAllClasses } from '../../api/classes';
import { useSearchParams } from 'react-router-dom';

export function useClasses() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  const { data, isPending, error } = useQuery({
    queryKey: ['classes', page, limit],
    queryFn: () => getAllClasses(page, limit),
  });

  const { data: classes, pagination } = data || {};
  return { classes, pagination, isPending, error };
}
