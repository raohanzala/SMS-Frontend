import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacherAttendanceApi } from "@/api/teacherAttendance";
import { UpdateTeacherAttendanceInput } from "../types/teacherAttendance.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useUpdateTeacherAttendance() {
  const queryClient = useQueryClient();

  const { mutate: updateAttendanceMutation, isPending: isUpdatingAttendance } = useMutation({
    mutationFn: ({ attendanceId, payload }: { attendanceId: string; payload: UpdateTeacherAttendanceInput }) =>
      updateTeacherAttendanceApi(attendanceId, payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Teacher attendance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["teacherAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to update teacher attendance");
    },
  });

  return { updateAttendanceMutation, isUpdatingAttendance };
}

