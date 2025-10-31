import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteStudent as deleteStudentApi } from "@/api/students";

export function useDeleteStudent() {
  const queryClient = useQueryClient()

  const { isPending: isStudentDeleting, mutate: deleteStudentMutation } = useMutation({
    mutationFn: deleteStudentApi,

    onSuccess: () => {
      toast.success('Student successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message)

  })
  console.log('Loadig in mutate :', isStudentDeleting)

  return { isStudentDeleting, deleteStudentMutation }
}