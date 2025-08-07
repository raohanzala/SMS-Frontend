import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { editSubject } from '../../api/subjects';

export function useUpdateSubject() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editSubject,
    onSuccess: (data) => {
      toast.success(data.message || 'Subjects updated successfully');
      queryClient.invalidateQueries(['subjects']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update subjects');
    },
  });

  return { updateSubject: mutate, isUpdating: isPending };
}
