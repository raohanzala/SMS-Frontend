import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelSubscriptionApi } from '@/api/subscriptions';
import { toastSuccess, toastError } from '@/utils/helpers';

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  const { mutate: cancelSubscriptionMutation, isPending: isCancellingSubscription } = useMutation({
    mutationFn: cancelSubscriptionApi,
    onSuccess: (data) => {
      toastSuccess(data.message || 'Subscription cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
    onError: (err: any) => {
      toastError(err, 'Failed to cancel subscription');
    },
  });

  return { cancelSubscriptionMutation, isCancellingSubscription };
}

