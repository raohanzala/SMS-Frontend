import { deleteEmployeeApi } from "@/api/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingEmployee, mutate: deleteEmployeeMutation } = useMutation({
    mutationFn: deleteEmployeeApi,

    onSuccess: () => {
      toast.success('Employee successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
    onError: (err: { message?: string }) => toast.error(err?.message || "Failed to delete employee")
  });

  return { isDeletingEmployee, deleteEmployeeMutation };
}

