import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateTimetable } from "@/api/timetable";
import { UpdateTimetableInput } from "../types/timetable.types";

export function useUpdateTimetable() {
  const queryClient = useQueryClient();

  const { mutate: updateTimetableMutation, isPending: isUpdatingTimetable } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: UpdateTimetableInput }) =>
      updateTimetable({ id, formData }),
    onSuccess: (data) => {
      toast.success(data.message || "Timetable entry updated successfully");
      queryClient.invalidateQueries({ queryKey: ["timetables"] });
      queryClient.invalidateQueries({ queryKey: ["classTimetable"] });
      queryClient.invalidateQueries({ queryKey: ["teacherTimetable"] });
      queryClient.invalidateQueries({ queryKey: ["studentTimetable"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update timetable entry");
    },
  });

  return { isUpdatingTimetable, updateTimetableMutation };
}

