import { addEmployeeApi } from "@/api/employees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useAddEmployee() {
  const queryClient = useQueryClient();

  const { mutate: addEmployeeMutation, isPending: isAddingEmployee } =
    useMutation({
      mutationFn: addEmployeeApi,
      onSuccess: () => {
        toast.success("New employee successfully created");
        queryClient.invalidateQueries({ queryKey: ["employees"] });
      },
      onError: (err: { message?: string }) =>
        toast.error(
          err.message ||
          "Failed to create employee"
        ),
    });

  return { isAddingEmployee, addEmployeeMutation };
}

