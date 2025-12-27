import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bulkDeleteStudentsApi } from '@/api/students';
import { toastSuccess } from '@/utils/helpers';
import { toastError } from '@/utils/helpers';
export function useBulkDeleteStudents() {
  const queryClient = useQueryClient();

  const { mutate: bulkDeleteStudentsMutation, isPending: isBulkDeletingStudents } = useMutation({
    mutationFn: bulkDeleteStudentsApi,
    onSuccess: (data) => {
      toastSuccess(data?.message || 'Students deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (err) => {
      toastError(err || 'Failed to delete students');
    },
  });

  return { isBulkDeletingStudents, bulkDeleteStudentsMutation };
}

