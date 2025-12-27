import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExamApi } from "@/api/exams";
import { CreateExamInput } from "../types/exam.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useCreateExam() {
  const queryClient = useQueryClient();

  const { mutate: createExamMutation, isPending: isCreatingExam } = useMutation({
    mutationFn: (payload: CreateExamInput) => createExamApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Exam created successfully");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => {
      toastError(err, "Failed to create exam");
    },
  });

  return { createExamMutation, isCreatingExam };
}

