import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkCreateMarksApi } from "@/api/marks";
import { BulkCreateMarksInput } from "../types/exam.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useBulkCreateMarks() {
  const queryClient = useQueryClient();

  const { mutate: bulkCreateMarksMutation, isPending: isBulkCreatingMarks } = useMutation({
    mutationFn: (payload: BulkCreateMarksInput) => bulkCreateMarksApi(payload),
    onSuccess: (data) => {
      toastSuccess(
        data.message ||
        `Marks processed: ${data.data.created} created, ${data.data.updated} updated`
      );
      queryClient.invalidateQueries({ queryKey: ["marks"] });
    },
    onError: (err) => {
      toastError(err, "Failed to save marks");
    },
  });

  return { bulkCreateMarksMutation, isBulkCreatingMarks };
}

