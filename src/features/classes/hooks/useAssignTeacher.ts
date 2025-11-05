import { assignTeacherToClassApi } from '@/api/classes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useAssignTeacher() {
  const queryClient = useQueryClient();

  const { mutate: assignTeacherMutation, isPending: isAssigningTeacher } = useMutation({
    mutationFn: assignTeacherToClassApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Teacher assigned successfully');
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to assign teacher');
    },
  });

  return { isAssigningTeacher, assignTeacherMutation };
}
