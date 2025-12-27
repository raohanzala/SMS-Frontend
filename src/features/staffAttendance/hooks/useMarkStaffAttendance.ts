import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markStaffAttendanceApi } from "@/api/staffAttendance";
import { MarkStaffAttendanceInput } from "../types/staffAttendance.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useMarkStaffAttendance() {
  const queryClient = useQueryClient();

  const { mutate: markAttendanceMutation, isPending: isMarkingAttendance } = useMutation({
    mutationFn: (payload: MarkStaffAttendanceInput) => markStaffAttendanceApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Staff attendance marked successfully");
      queryClient.invalidateQueries({ queryKey: ["staffAttendance"] });
    },
    onError: (err) => {
      toastError(err, "Failed to mark staff attendance");
    },
  });

  return { markAttendanceMutation, isMarkingAttendance };
}

