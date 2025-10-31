import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { markEmployeesAttendance } from "../../api/attendance";

export function useMarkEmployeesAttendance() {
  const queryClient = useQueryClient();

  const { mutate: markAttendance, isPending } = useMutation({
    mutationFn: markEmployeesAttendance,
    onSuccess: (data) => {
      toast.success(data?.message || "Marked employee successfully created");
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
    onError: (err) => toast.error(err?.response?.data?.message || err.message || 'Failed to create parent'),
  });

  return { isPending, markAttendance };
}