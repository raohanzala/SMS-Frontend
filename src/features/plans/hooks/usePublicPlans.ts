import { getPublicPlansApi } from '@/api/plans';
import { useQuery } from '@tanstack/react-query';

export function usePublicPlans() {
  const {
    isPending: isPlansLoading,
    error: plansError,
    data,
  } = useQuery({
    queryKey: ['public-plans'],
    queryFn: () => getPublicPlansApi(),
  });

  const plans = data?.data || [];
  return { plans, isPlansLoading, plansError };
}

