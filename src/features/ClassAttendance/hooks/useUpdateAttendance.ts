import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendanceApi } from "@/api/attendance";
import { UpdateAttendanceInput } from "../types/attendance.types";

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  const { mutate: updateAttendanceMutation, isPending: isUpdatingAttendance } = useMutation({
    mutationFn: ({ attendanceId, payload }: { attendanceId: string; payload: UpdateAttendanceInput }) =>
      updateAttendanceApi(attendanceId, payload),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["studentsByClass"] });
    },
  });

  return {
    updateAttendanceMutation,
    isUpdatingAttendance,
  };
};

