import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteClassApi } from '@/api/classes';

export function useDeleteClass() {
  const queryClient = useQueryClient();

  const { mutate: deleteClassMutation, isPending: isDeletingClass } = useMutation({
    mutationFn: deleteClassApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Class deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to delete class');
    },
  });

  return { isDeletingClass, deleteClassMutation };
}
