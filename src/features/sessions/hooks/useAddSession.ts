import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSessionApi } from '@/api/sessions';
import { toastError, toastSuccess } from '@/utils/helpers';

export function useAddSession() {
  const queryClient = useQueryClient();

  const { mutate: addSessionMutation, isPending: isAddingSession } = useMutation({
    mutationFn: addSessionApi,
    onSuccess: (data) => {
      toastSuccess(data.message || 'Session created successfully');
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (err) => toastError(err),
  });

  return { isAddingSession, addSessionMutation };
}

