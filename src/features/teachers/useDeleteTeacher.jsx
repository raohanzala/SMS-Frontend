import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteTeacher as deleteTeacherApi } from "@/api/teachers";

export function useDeleteTeacher() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteTeacher } = useMutation({
    mutationFn: deleteTeacherApi,

    onSuccess: () => {
      toast.success('Teacher successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (err) => toast.error(err.message)

  })
  console.log('Loadig in mutate :', isDeleting)

  return { isDeleting, deleteTeacher }
}