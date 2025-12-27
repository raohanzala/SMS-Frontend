import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCertificateApi } from "@/api/certificates";
import { CreateCertificateInput } from "../types/certificate.types";
import { toastSuccess, toastError } from "@/utils/helpers";

export function useCreateCertificate() {
  const queryClient = useQueryClient();

  const { mutate: createCertificateMutation, isPending: isCreatingCertificate } = useMutation({
    mutationFn: (payload: CreateCertificateInput) => createCertificateApi(payload),
    onSuccess: (data) => {
      toastSuccess(data.message || "Certificate created successfully");
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
    onError: (err) => {
      toastError(err, "Failed to create certificate");
    },
  });

  return { createCertificateMutation, isCreatingCertificate };
}

