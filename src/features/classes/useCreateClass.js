import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createClass } from '@/api/classes';

export function useCreateClass() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createClass,
    onSuccess: (data) => {
      toast.success(data.message || 'Class created successfully');
      queryClient.invalidateQueries(['classes']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to create class');
    },
  });

  return { createClass: mutate, isCreating: isPending };
}
