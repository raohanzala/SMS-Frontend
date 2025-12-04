import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { bulkDeleteClassesApi } from '@/api/classes';

export function useBulkDeleteClasses() {
  const queryClient = useQueryClient();

  const { mutate: bulkDeleteClassesMutation, isPending: isBulkDeletingClasses } = useMutation({
    mutationFn: bulkDeleteClassesApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Classes deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(err?.response?.data?.message || 'Failed to delete classes');
    },
  });

  return { isBulkDeletingClasses, bulkDeleteClassesMutation };
}

