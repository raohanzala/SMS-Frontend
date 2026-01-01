import { useQuery } from "@tanstack/react-query";
import { getSaaSSettingsApi } from "@/api/saasSettings";
import { SaaSSettings } from "../types/saasSettings.types";

export function useSaaSSettings() {
  const {
    isPending: isSaaSSettingsLoading,
    error: saaSSettingsError,
    data,
  } = useQuery({
    queryKey: ["saas-settings"],
    queryFn: () => getSaaSSettingsApi(),
  });

  const settings: SaaSSettings | null = data?.data || null;

  return { settings, isSaaSSettingsLoading, saaSSettingsError };
}

