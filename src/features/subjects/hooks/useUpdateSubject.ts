import { updateSubjectApi } from "@/api/subjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateSubject() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingSubject, mutate: updateSubjectMutation } = useMutation({
    mutationFn: updateSubjectApi,

    onSuccess: (data) => {
      toast.success(data.message || "Subject successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
    onError: (err: { message?: string; response?: { data?: { message?: string } } }) => {
      toast.error(err?.response?.data?.message || err.message || "Failed to update subject");
    },
  });

  return { isUpdatingSubject, updateSubjectMutation };
}

