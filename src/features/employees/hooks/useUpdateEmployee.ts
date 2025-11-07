import { updateEmployeeApi } from "@/api/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingEmployee, mutate: updateEmployeeMutation } = useMutation({
    mutationFn: ({ employeeId, formData }: { employeeId: string; formData: FormData }) =>
      updateEmployeeApi(employeeId, formData),

    onSuccess: (data) => {
      toast.success(data.message || "Employee successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
    onError: (err: { message?: string }) => toast.error(err.message || "Failed to update employee"),
  });

  return { isUpdatingEmployee, updateEmployeeMutation };
}

