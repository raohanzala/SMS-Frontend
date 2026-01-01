import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlanApi } from '@/api/plans';
import { CreatePlanInput } from '../types/plans.types';
import { toast } from 'react-toastify';

export function useCreatePlan() {
  const queryClient = useQueryClient();

  const { mutate: createPlanMutation, isPending: isCreatingPlan } = useMutation({
    mutationFn: (planData: CreatePlanInput) => createPlanApi(planData),
    onSuccess: (data) => {
      toast.success(data.message || 'Plan created successfully');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to create plan');
    },
  });

  return { isCreatingPlan, createPlanMutation };
}

