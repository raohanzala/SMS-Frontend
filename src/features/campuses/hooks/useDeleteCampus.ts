import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampusApi } from "@/api/campuses";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useDeleteCampus() {
  const queryClient = useQueryClient();

  const { mutate: deleteCampusMutation, isPending: isDeletingCampus } = useMutation({
    mutationFn: (campusId: string) => deleteCampusApi(campusId),
    onSuccess: (data) => {
      toastSuccess(data.message || "Campus deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
    },
    onError: (err) => {
      toastError(err, "Failed to delete campus");
    },
  });

  return { deleteCampusMutation, isDeletingCampus };
}

