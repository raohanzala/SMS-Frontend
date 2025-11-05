import { addSubjectApi } from "@/api/subjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useAddSubject() {
  const queryClient = useQueryClient();

  const { mutate: addSubjectMutation, isPending: isAddingSubject } =
    useMutation({
      mutationFn: addSubjectApi,
      onSuccess: () => {
        toast.success("New subject successfully created");
        queryClient.invalidateQueries({ queryKey: ["subjects"] });
      },
      onError: (err: { message?: string }) =>
        toast.error(
          err.message ||
          "Failed to create subject"
        ),
    });

  return { isAddingSubject, addSubjectMutation };
}

