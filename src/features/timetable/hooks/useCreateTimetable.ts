import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createTimetable } from "@/api/timetable";
import { CreateTimetableInput } from "../types/timetable.types";

export function useCreateTimetable() {
  const queryClient = useQueryClient();

  const { mutate: createTimetableMutation, isPending: isCreatingTimetable } = useMutation({
    mutationFn: (timetableData: CreateTimetableInput) => createTimetable(timetableData),
    onSuccess: (data) => {
      toast.success(data.message || "Timetable entry created successfully");
      queryClient.invalidateQueries({ queryKey: ["timetables"] });
      queryClient.invalidateQueries({ queryKey: ["classTimetable"] });
      queryClient.invalidateQueries({ queryKey: ["teacherTimetable"] });
      queryClient.invalidateQueries({ queryKey: ["studentTimetable"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create timetable entry");
    },
  });

  return { isCreatingTimetable, createTimetableMutation };
}

