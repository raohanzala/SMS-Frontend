import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reopenStaffAttendanceApi } from "@/api/staffAttendance";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useReopenStaffAttendance() {
  const queryClient = useQueryClient();

  const { mutate: reopenAttendanceMutation, isPending: isReopeningAttendance } = useMutation({
    mutationFn: (attendanceId: string) => reopenStaffAttendanceApi(attendanceId),
    onSuccess: (data) => {
      toastSuccess(data.message || "Staff attendance reopened successfully");
      queryClient.invalidateQueries({ queryKey: ["staffAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to reopen staff attendance");
    },
  });

  return { reopenAttendanceMutation, isReopeningAttendance };
}

