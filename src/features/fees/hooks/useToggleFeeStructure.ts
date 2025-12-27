import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFeeStructureApi } from "@/api/feeStructure";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useToggleFeeStructure() {
  const queryClient = useQueryClient();

  const { mutate: toggleFeeStructureMutation, isPending: isTogglingFeeStructure } = useMutation({
    mutationFn: (id: string) => toggleFeeStructureApi(id),
    onSuccess: (data) => {
      toastSuccess(data.message || "Fee structure toggled successfully");
      queryClient.invalidateQueries({ queryKey: ["feeStructure"] });
    },
    onError: (err) => {
      toastError(err, "Failed to toggle fee structure");
    },
  });

  return { toggleFeeStructureMutation, isTogglingFeeStructure };
}

