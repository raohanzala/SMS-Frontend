import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finalizeStaffAttendanceApi } from "@/api/staffAttendance";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useFinalizeStaffAttendance() {
  const queryClient = useQueryClient();

  const { mutate: finalizeAttendanceMutation, isPending: isFinalizingAttendance } = useMutation({
    mutationFn: (attendanceId: string) => finalizeStaffAttendanceApi(attendanceId),
    onSuccess: (data) => {
      toastSuccess(data.message || "Staff attendance finalized successfully");
      queryClient.invalidateQueries({ queryKey: ["staffAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to finalize staff attendance");
    },
  });

  return { finalizeAttendanceMutation, isFinalizingAttendance };
}

