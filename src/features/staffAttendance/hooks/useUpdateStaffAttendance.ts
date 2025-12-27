import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStaffAttendanceApi } from "@/api/staffAttendance";
import { UpdateStaffAttendanceInput } from "../types/staffAttendance.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useUpdateStaffAttendance() {
  const queryClient = useQueryClient();

  const { mutate: updateAttendanceMutation, isPending: isUpdatingAttendance } = useMutation({
    mutationFn: ({ attendanceId, payload }: { attendanceId: string; payload: UpdateStaffAttendanceInput }) =>
      updateStaffAttendanceApi(attendanceId, payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Staff attendance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staffAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to update staff attendance");
    },
  });

  return { updateAttendanceMutation, isUpdatingAttendance };
}

