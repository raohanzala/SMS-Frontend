import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePlanApi } from '@/api/plans';
import { toast } from 'react-toastify';

export function useDeletePlan() {
  const queryClient = useQueryClient();

  const { mutate: deletePlanMutation, isPending: isDeletingPlan } = useMutation({
    mutationFn: deletePlanApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Plan deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to delete plan');
    },
  });

  return { isDeletingPlan, deletePlanMutation };
}

