import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchoolApi, CreateSchoolInput } from '@/api/schools';
import { toastSuccess, toastError } from '@/utils/helpers';

export function useCreateSchool() {
  const queryClient = useQueryClient();

  const { mutate: createSchoolMutation, isPending: isCreatingSchool } = useMutation({
    mutationFn: createSchoolApi,
    onSuccess: (data) => {
      toastSuccess(data.message || 'School created successfully');
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
    onError: (err: any) => {
      toastError(err, 'Failed to create school');
    },
  });

  return { createSchoolMutation, isCreatingSchool };
}

