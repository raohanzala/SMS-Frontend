import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createTeacherApi } from "../../api/teachers";

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  const { mutate: createTeacher, isPending: isCreating } = useMutation({
    mutationFn: createTeacherApi,
    onSuccess: () => {
      toast.success("New student successfully created");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTeacher };
}