import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { markStudentsAttendance } from "../../api/attendance";

export function useMarkClassAttendance() {
  const queryClient = useQueryClient();

  const { mutate: markAttendance, isPending } = useMutation({
    mutationFn: markStudentsAttendance,
    onSuccess: (data) => {
      toast.success(data?.message || "Marked student successfully created");
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
    onError: (err) => toast.error(err?.response?.data?.message || err.message || 'Failed to create parent'),
  });

  return { isPending, markAttendance };
}