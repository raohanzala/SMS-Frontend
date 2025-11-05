import { deleteSubjectApi } from "@/api/subjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingSubject, mutate: deleteSubjectMutation } = useMutation({
    mutationFn: deleteSubjectApi,

    onSuccess: () => {
      toast.success('Subject successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
    onError: (err: { message?: string }) => toast.error(err?.message || "Failed to delete subject")
  });

  return { isDeletingSubject, deleteSubjectMutation };
}

