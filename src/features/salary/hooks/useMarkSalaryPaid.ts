import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markSalaryPaidApi } from "@/api/salary";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useMarkSalaryPaid() {
  const queryClient = useQueryClient();

  const { mutate: markSalaryPaidMutation, isPending: isMarkingSalaryPaid } = useMutation({
    mutationFn: (id: string) => markSalaryPaidApi(id),
    onSuccess: (data) => {
      toastSuccess(data.message || "Salary marked as paid successfully");
      queryClient.invalidateQueries({ queryKey: ["salarySlips"] });
    },
    onError: (err) => {
      toastError(err, "Failed to mark salary as paid");
    },
  });

  return { markSalaryPaidMutation, isMarkingSalaryPaid };
}

