import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { assignTeacher } from '../../api/classes';

export function useAssignTeacher() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: assignTeacher,
    onSuccess: (data) => {
      toast.success(data.message || 'Teacher assigned successfully');
      queryClient.invalidateQueries(['classes']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to assign teacher');
    },
  });

  return { assignTeacher: mutate, isAssigning: isPending };
}
