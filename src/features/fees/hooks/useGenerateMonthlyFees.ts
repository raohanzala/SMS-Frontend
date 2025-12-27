import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateMonthlyFeesApi } from "@/api/studentFees";
import { GenerateMonthlyFeesInput } from "../types/fee.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useGenerateMonthlyFees() {
  const queryClient = useQueryClient();

  const { mutate: generateMonthlyFeesMutation, isPending: isGeneratingFees } = useMutation({
    mutationFn: (payload: GenerateMonthlyFeesInput) => generateMonthlyFeesApi(payload),
    onSuccess: (data) => {
      toastSuccess(
        data.message || 
        `Monthly fees generated: ${data.data.generated} generated, ${data.data.skipped} skipped`
      );
      queryClient.invalidateQueries({ queryKey: ["studentFees"] });
    },
    onError: (err) => {
      toastError(err, "Failed to generate monthly fees");
    },
  });

  return { generateMonthlyFeesMutation, isGeneratingFees };
}

