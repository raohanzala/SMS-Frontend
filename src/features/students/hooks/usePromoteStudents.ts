import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { promoteStudentsApi } from "@/api/students";

export function usePromoteStudents() {
  const queryClient = useQueryClient();

  const { mutate: promoteStudentsMutation, isPending: isPromoting } =
    useMutation({
      mutationFn: promoteStudentsApi,
      onSuccess: (data) => {
        toast.success(
          data.message || `Successfully promoted ${data.count} student(s)`
        );
        queryClient.invalidateQueries({ queryKey: ["students"] });
        queryClient.invalidateQueries({
          queryKey: ["studentsByClassAndSession"],
        });
        queryClient.invalidateQueries({ queryKey: ["studentsByClass"] });
      },
      onError: (err) => {
        toast.error(err || "Failed to promote students");
      },
    });

  return { isPromoting, promoteStudentsMutation };
}
