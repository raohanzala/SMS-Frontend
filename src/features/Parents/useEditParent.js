import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editParent as editParentApi } from "@/api/parents";

export function useEditParent() {
  const queryClient = useQueryClient();

  const { isPending, mutate: editParent } = useMutation({
    mutationFn: editParentApi,

    onSuccess: (data) => {
      toast.success(data.message || "Parent successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["parents"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, editParent };
}