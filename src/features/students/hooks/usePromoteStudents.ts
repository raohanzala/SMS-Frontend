import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { promoteStudentsApi } from "@/api/students";
import { PromoteStudentsRequest } from "../types/promotion.types";

export function usePromoteStudents() {
  const queryClient = useQueryClient();

  const { mutate: promoteStudentsMutation, isPending: isPromoting } = useMutation({
    mutationFn: (promotionData: PromoteStudentsRequest) => promoteStudentsApi(promotionData),
    onSuccess: (data) => {
      toast.success(data.message || `Successfully promoted ${data.count} student(s)`);
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["studentsByClassAndSession"] });
      queryClient.invalidateQueries({ queryKey: ["studentsByClass"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to promote students");
    },
  });

  return { isPromoting, promoteStudentsMutation };
}

