import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAttendanceApi } from "@/api/attendance";
import { MarkAttendanceInput } from "../types/attendance.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useMarkAttendance() {
  const queryClient = useQueryClient();

  const { mutate: markAttendanceMutation, isPending: isMarkingAttendance } = useMutation({
    mutationFn: (payload: MarkAttendanceInput) => markAttendanceApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Attendance marked successfully");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: (err: Error & { response?: { data?: { message?: string } } }) => {
      toastError(err, "Failed to mark attendance");
    },
  });

  return { markAttendanceMutation, isMarkingAttendance };
}

