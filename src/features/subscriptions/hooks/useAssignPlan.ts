import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignPlanToSchoolApi, AssignPlanInput } from '@/api/subscriptions';
import { toastSuccess, toastError } from '@/utils/helpers';

export function useAssignPlan() {
  const queryClient = useQueryClient();

  const { mutate: assignPlanMutation, isPending: isAssigningPlan } = useMutation({
    mutationFn: assignPlanToSchoolApi,
    onSuccess: (data) => {
      toastSuccess(data.message || 'Plan assigned to school successfully');
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
    onError: (err: any) => {
      toastError(err, 'Failed to assign plan to school');
    },
  });

  return { assignPlanMutation, isAssigningPlan };
}

