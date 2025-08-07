import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createStudentApi } from "../../api/students";

export function useCreateStudent() {
  const queryClient = useQueryClient();

  const { mutate: createStudent, isPending: isCreating } = useMutation({
    mutationFn: createStudentApi,
    onSuccess: () => {
      toast.success("New student successfully created");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createStudent };
}