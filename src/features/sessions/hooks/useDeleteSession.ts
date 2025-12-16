import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSessionApi } from '@/api/sessions';
import { toastError, toastSuccess } from '@/utils/helpers';

export function useDeleteSession() {
  const queryClient = useQueryClient();

  const { mutate: deleteSessionMutation, isPending: isDeletingSession } = useMutation({
    mutationFn: deleteSessionApi,
    onSuccess: (data) => {
      toastSuccess(data.message || 'Session deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (err) => toastError(err),
  });

  return { isDeletingSession, deleteSessionMutation };
}

