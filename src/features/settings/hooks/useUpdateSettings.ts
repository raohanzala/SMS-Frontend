import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateSettingsApi } from '@/api/settings';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettingsMutation, isPending: isUpdatingSettings } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update settings');
    },
  });

  return { isUpdatingSettings, updateSettingsMutation };
}

