import { useQuery } from "@tanstack/react-query";
import { getAllSettingsApi } from "@/api/settings";
import { Settings } from "../types/settings.types";

export function useSettings() {
  const {
    isPending: isSettingsLoading,
    error: settingsError,
    data,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getAllSettingsApi(),
  });

  // Backend returns single object in data.data, not an array
  const settings: Settings | null = data?.data || null;

  return { settings, isSettingsLoading, settingsError };
}

