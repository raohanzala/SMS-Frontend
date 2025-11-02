import { updateParentApi } from "@/api/parents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateParent() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingParent, mutate: updateParentMutation } = useMutation({
    mutationFn: updateParentApi,

    onSuccess: (data) => {
      toast.success(data.message || "Parent successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["parents"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingParent, updateParentMutation };
}