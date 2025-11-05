import { updateTeacherApi } from "@/api/teachers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingTeacher, mutate: updateTeacherMutation } = useMutation({
    mutationFn: ({ teacherId, formData }: { teacherId: string; formData: FormData }) =>
      updateTeacherApi(teacherId, formData),

    onSuccess: (data) => {
      toast.success(data.message || "Teacher successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (err: { message?: string }) => toast.error(err.message || "Failed to update teacher"),
  });

  return { isUpdatingTeacher, updateTeacherMutation };
}

