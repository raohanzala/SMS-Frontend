import { useQuery } from "@tanstack/react-query";
import { getCertificatesApi } from "@/api/certificates";

export function useCertificates(studentId?: string | null, type?: string | null) {
  const {
    isPending: isCertificatesLoading,
    error: certificatesError,
    data,
  } = useQuery({
    queryKey: ["certificates", studentId, type],
    queryFn: () => getCertificatesApi(studentId || undefined, type || undefined),
    enabled: true,
  });

  const certificates = data?.data || [];

  return { certificates, isCertificatesLoading, certificatesError };
}

