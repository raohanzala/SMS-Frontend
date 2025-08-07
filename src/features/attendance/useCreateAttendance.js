import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAttendance as createAttendanceApi } from '../../api/attendance';

export function useCreateAttendance() {
  const queryClient = useQueryClient();

  const { mutate: createAttendance, isPending: isCreating } = useMutation({
    mutationFn: createAttendanceApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['attendances']);
    },
  });

  return { createAttendance, isCreating };
}
