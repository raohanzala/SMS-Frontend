import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createParent as createParentApi } from "../../api/parents";

export function useCreateParent() {
  const queryClient = useQueryClient();

  const { mutate: createParent, isPending: isCreating } = useMutation({
    mutationFn: createParentApi,
    onSuccess: () => {
      toast.success("New student successfully created");
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createParent };
}