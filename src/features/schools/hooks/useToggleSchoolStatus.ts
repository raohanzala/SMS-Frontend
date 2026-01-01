import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleSchoolStatusApi } from '@/api/schools';
import { toastSuccess, toastError } from '@/utils/helpers';

export function useToggleSchoolStatus() {
  const queryClient = useQueryClient();

  const { mutate: toggleSchoolStatusMutation, isPending: isTogglingStatus } = useMutation({
    mutationFn: ({ schoolId, isActive }: { schoolId: string; isActive: boolean }) =>
      toggleSchoolStatusApi(schoolId, isActive),
    onSuccess: (data) => {
      toastSuccess(data.message || 'School status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
    onError: (err: any) => {
      toastError(err, 'Failed to update school status');
    },
  });

  return { toggleSchoolStatusMutation, isTogglingStatus };
}

