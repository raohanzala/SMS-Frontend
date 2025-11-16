import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteTimetable } from "@/api/timetable";

export function useDeleteTimetable() {
  const queryClient = useQueryClient();

  const { mutate: deleteTimetableMutation, isPending: isDeletingTimetable } = useMutation({
    mutationFn: (id: string) => deleteTimetable(id),
    onSuccess: (data) => {
      toast.success(data.message || "Timetable entry deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["timetables"] });
      queryClient.invalidateQueries({ queryKey: ["classTimetable"] });
      queryClient.invalidateQueries({ queryKey: ["teacherTimetable"] });
      queryClient.invalidateQueries({ queryKey: ["studentTimetable"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete timetable entry");
    },
  });

  return { isDeletingTimetable, deleteTimetableMutation };
}

