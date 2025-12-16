import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addClassApi } from '@/api/classes';
import { toastError, toastSuccess } from '@/utils/helpers';

export function useAddClass() {
  const queryClient = useQueryClient();

  const { mutate: addClassMutation, isPending: isAddingClass } = useMutation({
    mutationFn: addClassApi,
    onSuccess: (data) => {
      toastSuccess(data.message || 'Class created successfully');
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err) => toastError(err),
  });

  return { isAddingClass, addClassMutation };
}
