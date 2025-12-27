import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addStudentsDummyApi } from "@/api/students";

export function useAddDummyStudents() {
  const queryClient = useQueryClient();

  const { mutate: addDummyStudentsMutation, isPending: isAddingDummyStudents } =
    useMutation({
      mutationFn: addStudentsDummyApi,
      onSuccess: () => {
        toast.success("Dummy students successfully created");
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
      onError: (err) =>
        toast.error(
          err.message || "Failed to create dummy students"
        ),
    });

  return { isAddingDummyStudents, addDummyStudentsMutation };
}
