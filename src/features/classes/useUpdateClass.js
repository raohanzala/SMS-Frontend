import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateClass } from '../../api/classes';

export function useUpdateClass() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateClass,
    onSuccess: (data) => {
      toast.success(data.message || 'Class updated successfully');
      queryClient.invalidateQueries(['classes']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update class');
    },
  });

  return { updateClass: mutate, isUpdating: isPending };
}
