import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteClass } from '@/api/classes';

export function useDeleteClass() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteClass,
    onSuccess: (data) => {
      toast.success(data.message || 'Class deleted successfully');
      queryClient.invalidateQueries(['classes']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to delete class');
    },
  });

  return { deleteClass: mutate, isDeleting: isPending };
}
