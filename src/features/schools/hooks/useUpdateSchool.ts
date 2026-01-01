import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSchoolApi, UpdateSchoolInput } from '@/api/schools';
import { toastSuccess, toastError } from '@/utils/helpers';

export function useUpdateSchool() {
  const queryClient = useQueryClient();

  const { mutate: updateSchoolMutation, isPending: isUpdatingSchool } = useMutation({
    mutationFn: ({ schoolId, data }: { schoolId: string; data: UpdateSchoolInput }) =>
      updateSchoolApi(schoolId, data),
    onSuccess: (data) => {
      toastSuccess(data.message || 'School updated successfully');
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
    onError: (err: any) => {
      toastError(err, 'Failed to update school');
    },
  });

  return { updateSchoolMutation, isUpdatingSchool };
}

