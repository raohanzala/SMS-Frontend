import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteParentApi } from "@/api/parents";

export function useDeleteParent() {
  const queryClient = useQueryClient()

  const { isPending: isDeletingParent, mutate: deleteParentMutation } = useMutation({
    mutationFn: deleteParentApi,

    onSuccess: () => {
      toast.success('Parent successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ["parents"],
      }); 
    },
    onError: (err) => toast.error(err.message)

  })

  return { isDeletingParent, deleteParentMutation }
}