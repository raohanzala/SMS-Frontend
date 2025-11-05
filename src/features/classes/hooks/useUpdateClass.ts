import { updateClassApi } from '@/api/classes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useUpdateClass() {
  const queryClient = useQueryClient();

  const { mutate: updateClassMutation, isPending: isUpdatingClass } = useMutation({
    mutationFn: updateClassApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Class updated successfully');
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err?.response?.data?.message || 'Failed to update class');
    },
  });

  return { isUpdatingClass, updateClassMutation };
}
