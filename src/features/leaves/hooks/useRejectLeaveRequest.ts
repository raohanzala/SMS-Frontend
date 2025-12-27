import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectLeaveRequestApi } from "@/api/leaves";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useRejectLeaveRequest() {
  const queryClient = useQueryClient();

  const { mutate: rejectLeaveRequestMutation, isPending: isRejectingLeaveRequest } = useMutation({
    mutationFn: (id: string) => rejectLeaveRequestApi(id),
    onSuccess: (data) => {
      toastSuccess(data.message || "Leave request rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
    },
    onError: (err) => {
      toastError(err, "Failed to reject leave request");
    },
  });

  return { rejectLeaveRequestMutation, isRejectingLeaveRequest };
}

