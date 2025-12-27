import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finalizeAttendanceApi } from "@/api/attendance";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useFinalizeAttendance() {
  const queryClient = useQueryClient();

  const { mutate: finalizeAttendanceMutation, isPending: isFinalizingAttendance } = useMutation({
    mutationFn: (attendanceId: string) => finalizeAttendanceApi(attendanceId),
    onSuccess: (data) => {
      toastSuccess(data.message || "Attendance finalized successfully");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to finalize attendance");
    },
  });

  return { finalizeAttendanceMutation, isFinalizingAttendance };
}

