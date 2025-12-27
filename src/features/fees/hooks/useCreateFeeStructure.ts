import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeeStructureApi } from "@/api/feeStructure";
import { CreateFeeStructureInput } from "../types/fee.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useCreateFeeStructure() {
  const queryClient = useQueryClient();

  const { mutate: createFeeStructureMutation, isPending: isCreatingFeeStructure } = useMutation({
    mutationFn: (payload: CreateFeeStructureInput) => createFeeStructureApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Fee structure created successfully");
      queryClient.invalidateQueries({ queryKey: ["feeStructure"] });
    },
    onError: (err) => {
      toastError(err, "Failed to create fee structure");
    },
  });

  return { createFeeStructureMutation, isCreatingFeeStructure };
}

