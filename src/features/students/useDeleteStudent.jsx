import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteStudent as deleteStudentApi } from "@/api/students";

export function useDeleteStudent() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteStudent } = useMutation({
    mutationFn: deleteStudentApi,

    onSuccess: () => {
      toast.success('Student successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message)

  })
  console.log('Loadig in mutate :', isDeleting)

  return { isDeleting, deleteStudent }
}