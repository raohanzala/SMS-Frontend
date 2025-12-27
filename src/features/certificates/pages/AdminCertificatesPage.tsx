import { useState, useCallback } from "react";
import { useCertificates } from "../hooks/useCertificates";
import { useCreateCertificate } from "../hooks/useCreateCertificate";
import CertificatesTable from "../components/CertificatesTable";
import CertificateForm from "../components/CertificateForm";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import { Plus, Award } from "lucide-react";
import { CreateCertificateInput } from "../types/certificate.types";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { User } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";

const AdminCertificatesPage = () => {
  const [isShowCertificateModal, setIsShowCertificateModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { certificates, isCertificatesLoading, certificatesError } = useCertificates(
    selectedStudentId,
    selectedType
  );
  const { createCertificateMutation, isCreatingCertificate } = useCreateCertificate();

  const handleShowCertificateModal = useCallback(() => {
    setIsShowCertificateModal(true);
  }, []);

  const handleCloseCertificateModal = useCallback(() => {
    setIsShowCertificateModal(false);
  }, []);

  const handleSubmit = useCallback(
    (data: CreateCertificateInput) => {
      createCertificateMutation(data, {
        onSuccess: () => {
          handleCloseCertificateModal();
        },
      });
    },
    [createCertificateMutation, handleCloseCertificateModal]
  );

  const handleDownload = useCallback((certificate: any) => {
    // TODO: Implement certificate download/print functionality
    console.log("Download certificate:", certificate);
    // This would typically generate a PDF or open a print dialog
  }, []);

  if (isCertificatesLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Certificates</h1>
          <p className="text-sm text-text-secondary mt-1">
            Issue and manage student certificates
          </p>
        </div>
        <Button
          onClick={handleShowCertificateModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Issue Certificate
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormRowVertical
            label="Student"
            name="student"
            icon={<User className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="student"
              value={selectedStudentId}
              onChange={(value) =>
                setSelectedStudentId(Array.isArray(value) ? value[0] || null : value)
              }
              placeholder="Search student (optional)"
            />
          </FormRowVertical>

          <FormRowVertical
            label="Certificate Type"
            name="type"
            icon={<Award className="inline w-4 h-4" />}
          >
            <select
              value={selectedType || ""}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">All Types</option>
              <option value="LEAVING">Leaving Certificate</option>
              <option value="BONAFIDE">Bonafide Certificate</option>
              <option value="CHARACTER">Character Certificate</option>
            </select>
          </FormRowVertical>
        </div>
      </div>

      {certificatesError ? (
        <ErrorMessage message={certificatesError.message || "Failed to load certificates"} />
      ) : certificates.length > 0 ? (
        <CertificatesTable
          certificates={certificates}
          onDownload={handleDownload}
        />
      ) : (
        <EmptyState
          icon={Award}
          title="No certificates found"
          description="Issue a certificate to get started"
        />
      )}

      {/* Issue Certificate Modal */}
      {isShowCertificateModal && (
        <CertificateForm
          onClose={handleCloseCertificateModal}
          onSubmit={handleSubmit}
          isSubmitting={isCreatingCertificate}
        />
      )}
    </div>
  );
};

export default AdminCertificatesPage;

