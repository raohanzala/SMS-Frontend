import { updateStudentApi } from "@/api/students";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingStudent, mutate: updateStudentMutation } = useMutation({
    mutationFn: updateStudentApi,

    onSuccess: (data) => {
      toast.success(data.message || "Student successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingStudent, updateStudentMutation };
}