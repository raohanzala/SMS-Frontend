import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addClassApi } from '@/api/classes';

export function useAddClass() {
  const queryClient = useQueryClient();

  const { mutate: addClassMutation, isPending: isAddingClass } = useMutation({
    mutationFn: addClassApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Class created successfully');
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to create class');
    },
  });

  return { isAddingClass, addClassMutation };
}
