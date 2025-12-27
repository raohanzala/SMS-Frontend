import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateSalaryApi } from "@/api/salary";
import { GenerateSalaryInput } from "../types/salary.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useGenerateSalary() {
  const queryClient = useQueryClient();

  const { mutate: generateSalaryMutation, isPending: isGeneratingSalary } = useMutation({
    mutationFn: (payload: GenerateSalaryInput) => generateSalaryApi(payload),
    onSuccess: (data) => {
      toastSuccess(
        data.message ||
        `Salary slips generated: ${data.data.generated} generated, ${data.data.skipped} skipped`
      );
      queryClient.invalidateQueries({ queryKey: ["salarySlips"] });
    },
    onError: (err) => {
      toastError(err, "Failed to generate salary slips");
    },
  });

  return { generateSalaryMutation, isGeneratingSalary };
}

