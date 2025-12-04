import { useQuery } from "@tanstack/react-query";
import { getAllSettingsApi } from "@/api/settings";

export function useSettings() {
  const {
    isPending: isSettingsLoading,
    error: settingsError,
    data,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getAllSettingsApi(),
  });

  const settings = data?.data || [];

  return { settings, isSettingsLoading, settingsError };
}

