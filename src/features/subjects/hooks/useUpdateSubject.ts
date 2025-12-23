import { updateSubjectApi } from "@/api/subjects";
import { toastError, toastSuccess } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateSubject() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingSubject, mutate: updateSubjectMutation } = useMutation({
    mutationFn: updateSubjectApi,

    onSuccess: (data) => {
      toastSuccess(data.message || "Subject successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
    onError: (err) => toastError(err)
  });

  return { isUpdatingSubject, updateSubjectMutation };
}

