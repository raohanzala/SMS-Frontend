import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addSettingsApi } from '@/api/settings';

export function useAddSettings() {
  const queryClient = useQueryClient();

  const { mutate: addSettingsMutation, isPending: isAddingSettings } = useMutation({
    mutationFn: addSettingsApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Settings created successfully');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to create settings');
    },
  });

  return { isAddingSettings, addSettingsMutation };
}

