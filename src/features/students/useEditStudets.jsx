import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editStudent as editStudentApi } from "@/api/students";

export function useEditStudent() {
  const queryClient = useQueryClient();

  const { isPending, mutate: editStudent } = useMutation({
    mutationFn: editStudentApi,

    onSuccess: (data) => {
      toast.success(data.message || "Student successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, editStudent };
}