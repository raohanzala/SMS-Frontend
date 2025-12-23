import { deleteSubjectApi } from "@/api/subjects";
import { toastError, toastSuccess } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingSubject, mutate: deleteSubjectMutation } = useMutation({
    mutationFn: deleteSubjectApi,

    onSuccess: (data) => {
      toastSuccess(data.message || "Subject successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
    onError: (err) => toastError(err)
  });

  return { isDeletingSubject, deleteSubjectMutation };
}

