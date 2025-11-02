import { addParentApi } from "@/api/parents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useAddParent() {
  const queryClient = useQueryClient();

  const { mutate: addParentMutation, isPending: isAddingParent } = useMutation({
    mutationFn: addParentApi,
    onSuccess: () => {
      toast.success("New parent successfully created");
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
    onError: (err) => toast.error(err.message || 'Failed to create parent'),
  });

  return { isAddingParent, addParentMutation };
}