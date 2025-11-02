import { deleteStudentApi } from "@/api/students";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteStudent() {
  const queryClient = useQueryClient()

  const { isPending: isDeletingStudent, mutate: deleteStudentMutation } = useMutation({
    mutationFn: deleteStudentApi,

    onSuccess: () => {
      toast.success('Student successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message)

  })

  return { isDeletingStudent, deleteStudentMutation }
}