import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editTeacher as editTeacherApi } from "@/api/teachers";

export function useEditTeacher() {
  const queryClient = useQueryClient();

  const { isEditing, mutate: editTeacher } = useMutation({
    mutationFn: editTeacherApi,

    onSuccess: (data) => {
      toast.success(data.message || "Student successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTeacher };
}