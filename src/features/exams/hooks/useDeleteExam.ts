import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExamApi } from "@/api/exams";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useDeleteExam() {
  const queryClient = useQueryClient();

  const { mutate: deleteExamMutation, isPending: isDeletingExam } = useMutation({
    mutationFn: (id: string) => deleteExamApi(id),
    onSuccess: (data) => {
      toastSuccess(data.message || "Exam deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => {
      toastError(err, "Failed to delete exam");
    },
  });

  return { deleteExamMutation, isDeletingExam };
}

