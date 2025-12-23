import { addSubjectApi } from "@/api/subjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastSuccess } from "@/utils/helpers";
import { toastError } from "@/utils/helpers";

export function useAddSubject() {
  const queryClient = useQueryClient();

  const { mutate: addSubjectMutation, isPending: isAddingSubject } =
    useMutation({
      mutationFn: addSubjectApi,
      onSuccess: (data) => {
        toastSuccess(data.message || "New subject successfully created");
        queryClient.invalidateQueries({ queryKey: ["subjects"] });
      },
      onError: (err) => toastError(err)
    });

  return { isAddingSubject, addSubjectMutation };
}

