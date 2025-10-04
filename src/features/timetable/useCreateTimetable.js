import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createTimetable as createTimetableApi } from "@/api/timetable";

export function useCreateTimetable() {
  const queryClient = useQueryClient();

  const { mutate: createTimetable, isPending: isCreating } = useMutation({
    mutationFn: createTimetableApi,
    onSuccess: () => {
      toast.success("New timetable successfully created");
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTimetable };
}