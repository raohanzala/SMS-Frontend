import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeeStructureApi } from "@/api/feeStructure";
import { UpdateFeeStructureInput } from "../types/fee.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useUpdateFeeStructure() {
  const queryClient = useQueryClient();

  const { mutate: updateFeeStructureMutation, isPending: isUpdatingFeeStructure } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateFeeStructureInput }) =>
      updateFeeStructureApi(id, payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Fee structure updated successfully");
      queryClient.invalidateQueries({ queryKey: ["feeStructure"] });
    },
    onError: (err) => {
      toastError(err, "Failed to update fee structure");
    },
  });

  return { updateFeeStructureMutation, isUpdatingFeeStructure };
}

