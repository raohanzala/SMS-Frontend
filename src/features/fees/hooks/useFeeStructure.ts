import { useQuery } from "@tanstack/react-query";
import { getFeeStructureApi } from "@/api/feeStructure";

export function useFeeStructure(classId?: string | null) {
  const {
    isPending: isFeeStructureLoading,
    error: feeStructureError,
    data,
  } = useQuery({
    queryKey: ["feeStructure", classId],
    queryFn: () => getFeeStructureApi(classId || undefined),
    enabled: true,
  });

  const feeStructures = data?.data || [];

  return { feeStructures, isFeeStructureLoading, feeStructureError };
}

