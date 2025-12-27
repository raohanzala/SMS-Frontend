import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reopenAttendanceApi } from "@/api/attendance";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useReopenAttendance() {
  const queryClient = useQueryClient();

  const { mutate: reopenAttendanceMutation, isPending: isReopeningAttendance } = useMutation({
    mutationFn: (attendanceId: string) => reopenAttendanceApi(attendanceId),
    onSuccess: (data) => {
      toastSuccess(data.message || "Attendance reopened successfully");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to reopen attendance");
    },
  });

  return { reopenAttendanceMutation, isReopeningAttendance };
}

