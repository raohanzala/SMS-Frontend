import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createSubject as createSubjectApi } from "@/api/subjects";

export function useCreateSubject() {
  const queryClient = useQueryClient();

  const { mutate: createSubject, isPending: isCreating } = useMutation({
    mutationFn: createSubjectApi,
    onSuccess: () => {
      toast.success("New student successfully created");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createSubject };
}