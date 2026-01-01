import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePlanApi } from '@/api/plans';
import { UpdatePlanInput } from '../types/plans.types';
import { toast } from 'react-toastify';

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  const { mutate: updatePlanMutation, isPending: isUpdatingPlan } = useMutation({
    mutationFn: ({ planId, planData }: { planId: string; planData: UpdatePlanInput }) =>
      updatePlanApi(planId, planData),
    onSuccess: (data) => {
      toast.success(data.message || 'Plan updated successfully');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update plan');
    },
  });

  return { isUpdatingPlan, updatePlanMutation };
}

