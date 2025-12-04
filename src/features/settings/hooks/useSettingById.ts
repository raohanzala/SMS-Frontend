import { useQuery } from "@tanstack/react-query";
import { getSettingsByIdApi } from "@/api/settings";

export function useSettingById(settingsId: string | null) {
  const {
    isPending: isSettingLoading,
    error: settingError,
    data,
  } = useQuery({
    queryKey: ["settings", settingsId],
    queryFn: () => getSettingsByIdApi(settingsId!),
    enabled: !!settingsId,
  });

  const setting = data?.data || null;

  return { setting, isSettingLoading, settingError };
}

