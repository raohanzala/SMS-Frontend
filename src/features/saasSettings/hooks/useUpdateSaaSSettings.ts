import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateSaaSSettingsApi } from '@/api/saasSettings';
import { UpdateSaaSSettingsInput } from '../types/saasSettings.types';

export function useUpdateSaaSSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSaaSSettingsMutation, isPending: isUpdatingSaaSSettings } = useMutation({
    mutationFn: (settingsData: UpdateSaaSSettingsInput) =>
      updateSaaSSettingsApi(settingsData),
    onSuccess: (data) => {
      toast.success(data.message || 'SaaS settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['saas-settings'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update SaaS settings');
    },
  });

  return { isUpdatingSaaSSettings, updateSaaSSettingsMutation };
}

