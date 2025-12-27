import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reopenTeacherAttendanceApi } from "@/api/teacherAttendance";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useReopenTeacherAttendance() {
  const queryClient = useQueryClient();

  const { mutate: reopenAttendanceMutation, isPending: isReopeningAttendance } = useMutation({
    mutationFn: (attendanceId: string) => reopenTeacherAttendanceApi(attendanceId),
    onSuccess: (data) => {
      toastSuccess(data.message || "Teacher attendance reopened successfully");
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to reopen teacher attendance");
    },
  });

  return { reopenAttendanceMutation, isReopeningAttendance };
}

