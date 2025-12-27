import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExamApi } from "@/api/exams";
import { UpdateExamInput } from "../types/exam.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useUpdateExam() {
  const queryClient = useQueryClient();

  const { mutate: updateExamMutation, isPending: isUpdatingExam } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateExamInput }) =>
      updateExamApi(id, payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Exam updated successfully");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => {
      toastError(err, "Failed to update exam");
    },
  });

  return { updateExamMutation, isUpdatingExam };
}

