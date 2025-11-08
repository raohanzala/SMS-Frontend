import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAttendanceApi } from "@/api/attendance";

export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAttendanceMutation, isPending: isDeletingAttendance } = useMutation({
    mutationFn: (attendanceId: string) => deleteAttendanceApi(attendanceId),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["studentsByClass"] });
    },
  });

  return {
    deleteAttendanceMutation,
    isDeletingAttendance,
  };
};

