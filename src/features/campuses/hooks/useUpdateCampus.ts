import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCampusApi } from "@/api/campuses";
import { UpdateCampusInput } from "../types/campus.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useUpdateCampus() {
  const queryClient = useQueryClient();

  const { mutate: updateCampusMutation, isPending: isUpdatingCampus } = useMutation({
    mutationFn: ({ campusId, payload }: { campusId: string; payload: UpdateCampusInput }) =>
      updateCampusApi(campusId, payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Campus updated successfully");
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
    },
    onError: (err) => {
      toastError(err, "Failed to update campus");
    },
  });

  return { updateCampusMutation, isUpdatingCampus };
}

