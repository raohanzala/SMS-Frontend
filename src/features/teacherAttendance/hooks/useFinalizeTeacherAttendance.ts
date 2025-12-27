import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finalizeTeacherAttendanceApi } from "@/api/teacherAttendance";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useFinalizeTeacherAttendance() {
  const queryClient = useQueryClient();

  const { mutate: finalizeAttendanceMutation, isPending: isFinalizingAttendance } = useMutation({
    mutationFn: (attendanceId: string) => finalizeTeacherAttendanceApi(attendanceId),
    onSuccess: (data) => {
      toastSuccess(data.message || "Teacher attendance finalized successfully");
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to finalize teacher attendance");
    },
  });

  return { finalizeAttendanceMutation, isFinalizingAttendance };
}

