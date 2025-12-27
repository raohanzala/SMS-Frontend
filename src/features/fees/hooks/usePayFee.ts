import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payFeeApi } from "@/api/studentFees";
import { PayFeeInput } from "../types/fee.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function usePayFee() {
  const queryClient = useQueryClient();

  const { mutate: payFeeMutation, isPending: isPayingFee } = useMutation({
    mutationFn: ({ feeId, payload }: { feeId: string; payload: PayFeeInput }) =>
      payFeeApi(feeId, payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Payment recorded successfully");
      queryClient.invalidateQueries({ queryKey: ["studentFees"] });
      queryClient.invalidateQueries({ queryKey: ["feeReport"] });
    },
    onError: (err) => {
      toastError(err, "Failed to record payment");
    },
  });

  return { payFeeMutation, isPayingFee };
}

