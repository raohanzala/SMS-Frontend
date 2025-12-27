import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCampusApi } from "@/api/campuses";
import { CreateCampusInput } from "../types/campus.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useCreateCampus() {
  const queryClient = useQueryClient();

  const { mutate: createCampusMutation, isPending: isCreatingCampus } = useMutation({
    mutationFn: (payload: CreateCampusInput) => createCampusApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Campus created successfully");
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
    },
    onError: (err: Error & { response?: { data?: { message?: string } } }) => {
      toastError(err, "Failed to create campus");
    },
  });

  return { createCampusMutation, isCreatingCampus };
}

