import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeaveRequestApi } from "@/api/leaves";
import { CreateLeaveRequestInput } from "../types/leave.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useCreateLeaveRequest() {
  const queryClient = useQueryClient();

  const { mutate: createLeaveRequestMutation, isPending: isCreatingLeaveRequest } = useMutation({
    mutationFn: (payload: CreateLeaveRequestInput) => createLeaveRequestApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Leave request created successfully");
      queryClient.invalidateQueries({ queryKey: ["leaveRequests"] });
    },
    onError: (err) => {
      toastError(err, "Failed to create leave request");
    },
  });

  return { createLeaveRequestMutation, isCreatingLeaveRequest };
}

