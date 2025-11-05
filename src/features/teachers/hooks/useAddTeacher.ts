import { addTeacherApi } from "@/api/teachers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useAddTeacher() {
  const queryClient = useQueryClient();

  const { mutate: addTeacherMutation, isPending: isAddingTeacher } =
    useMutation({
      mutationFn: addTeacherApi,
      onSuccess: () => {
        toast.success("New teacher successfully created");
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
      onError: (err: { message?: string }) =>
        toast.error(
          err.message ||
          "Failed to create teacher"
        ),
    });

  return { isAddingTeacher, addTeacherMutation };
}

