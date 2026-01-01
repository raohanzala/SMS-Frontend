import { getAllPlansApi } from '@/api/plans';
import { useQuery } from '@tanstack/react-query';

export function usePlans(isActive?: boolean) {
  const {
    isPending: isPlansLoading,
    error: plansError,
    data,
  } = useQuery({
    queryKey: ['plans', isActive],
    queryFn: () => getAllPlansApi({ isActive }),
  });

  const plans = data?.data || [];
  return { plans, isPlansLoading, plansError };
}

