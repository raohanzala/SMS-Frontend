import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MarkAttendanceInput } from "../types/attendance.types";
import { markAttendanceApi } from "@/api/attendance";

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  const { mutate: markAttendanceMutation, isPending: isMarkingAttendance } = useMutation({
    mutationFn: (payload: MarkAttendanceInput) => markAttendanceApi(payload),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["studentsByClass"] });
    },
  });

  return {
    markAttendanceMutation,
    isMarkingAttendance,
  };
};

