import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteSettingsApi } from '@/api/settings';

export function useDeleteSettings() {
  const queryClient = useQueryClient();

  const { mutate: deleteSettingsMutation, isPending: isDeletingSettings } = useMutation({
    mutationFn: deleteSettingsApi,
    onSuccess: (data) => {
      toast.success(data.message || 'Settings deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to delete settings');
    },
  });

  return { isDeletingSettings, deleteSettingsMutation };
}

