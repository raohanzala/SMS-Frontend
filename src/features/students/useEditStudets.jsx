import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editStudent } from "../../api/students";

export function useEditStudent() {
  const queryClient = useQueryClient();

  const { isPending, mutate: editBlog } = useMutation({
    mutationFn: editStudent,

    onSuccess: (data) => {
      toast.success(data.message || "Student successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, editBlog };
}