import { deleteTeacherApi } from "@/api/teachers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingTeacher, mutate: deleteTeacherMutation } = useMutation({
    mutationFn: deleteTeacherApi,

    onSuccess: () => {
      toast.success('Teacher successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (err: { message?: string }) => toast.error(err?.message || "Failed to delete teacher")
  });

  return { isDeletingTeacher, deleteTeacherMutation };
}

