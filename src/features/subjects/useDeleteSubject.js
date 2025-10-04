import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteSubject as deleteSubjectApi } from "@/api/subjects";

export function useDeleteSubject() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteSubject } = useMutation({
    mutationFn: deleteSubjectApi,

    onSuccess: () => {
      toast.success('Subject successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
    onError: (err) => toast.error(err.message)

  })
  console.log('Loadig in mutate :', isDeleting)

  return { isDeleting, deleteSubject }
}