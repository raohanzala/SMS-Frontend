import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markTeacherAttendanceApi } from "@/api/teacherAttendance";
import { MarkTeacherAttendanceInput } from "../types/teacherAttendance.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useMarkTeacherAttendance() {
  const queryClient = useQueryClient();

  const { mutate: markAttendanceMutation, isPending: isMarkingAttendance } = useMutation({
    mutationFn: (payload: MarkTeacherAttendanceInput) => markTeacherAttendanceApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Teacher attendance marked successfully");
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to mark teacher attendance");
    },
  });

  return { markAttendanceMutation, isMarkingAttendance };
}

