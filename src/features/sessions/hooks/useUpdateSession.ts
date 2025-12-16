import { updateSessionApi } from '@/api/sessions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useUpdateSession() {
  const queryClient = useQueryClient();

  const { mutate: updateSessionMutation, isPending: isUpdatingSession } = useMutation({
    mutationFn: updateSessionApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Session updated successfully');
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err?.response?.data?.message || 'Failed to update session');
    },
  });

  return { isUpdatingSession, updateSessionMutation };
}

