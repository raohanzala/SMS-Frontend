import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveLeaveRequestApi } from "@/api/leaves";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useApproveLeaveRequest() {
  const queryClient = useQueryClient();

  const { mutate: approveLeaveRequestMutation, isPending: isApprovingLeaveRequest } = useMutation({
    mutationFn: (id: string) => approveLeaveRequestApi(id),
    onSuccess: (data) => {
      toastSuccess(data.message || "Leave request approved successfully");
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
    },
    onError: (err) => {
      toastError(err, "Failed to approve leave request");
    },
  });

  return { approveLeaveRequestMutation, isApprovingLeaveRequest };
}

