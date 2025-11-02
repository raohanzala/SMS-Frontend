import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addStudentApi } from "@/api/students";

export function useAddStudent() {
  const queryClient = useQueryClient();

  const { mutate: addStudentMutation, isPending: isAddingStudent } =
    useMutation({
      mutationFn: addStudentApi,
      onSuccess: () => {
        toast.success("New student successfully created");
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
      onError: (err) =>
        toast.error(
            err.message ||
            "Failed to create student"
        ),
    });

  return { isAddingStudent, addStudentMutation };
}
