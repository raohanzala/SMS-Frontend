import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendanceApi } from "@/api/attendance";
import { UpdateAttendanceInput } from "../types/attendance.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  const { mutate: updateAttendanceMutation, isPending: isUpdatingAttendance } = useMutation({
    mutationFn: ({ attendanceId, payload }: { attendanceId: string; payload: UpdateAttendanceInput }) =>
      updateAttendanceApi(attendanceId, payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Attendance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to update attendance");
    },
  });

  return { updateAttendanceMutation, isUpdatingAttendance };
}

