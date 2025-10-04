import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteParent as deleteParentApi } from "@/api/parents";

export function useDeleteParent() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteParent } = useMutation({
    mutationFn: deleteParentApi,

    onSuccess: () => {
      toast.success('Student successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ["parents"],
      });
    },
    onError: (err) => toast.error(err.message)

  })
  console.log('Loadig in mutate :', isDeleting)

  return { isDeleting, deleteParent }
}