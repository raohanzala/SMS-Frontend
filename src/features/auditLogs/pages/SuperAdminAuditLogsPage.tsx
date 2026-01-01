import { useState } from "react";
import { FileText } from "lucide-react";
import { useAuditLogs } from "../hooks/useAuditLogs";
import AuditLogTable from "../components/AuditLogTable";
import AuditLogFilters from "../components/AuditLogFilters";
import AuditLogDetailsModal from "../components/AuditLogDetailsModal";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import { AuditLog } from "@/api/auditLogs";

export default function SuperAdminAuditLogsPage() {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { auditLogs, pagination, isAuditLogsLoading, auditLogsError } =
    useAuditLogs();

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedLog(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Audit Logs</h1>
        <p className="text-sm text-text-secondary mt-1">
          View and filter system audit logs
        </p>
      </div>

      <AuditLogFilters showCampusFilter={true} />

      {isAuditLogsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {auditLogsError && (
        <ErrorMessage
          message={auditLogsError.message || "Failed to load audit logs"}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isAuditLogsLoading && !auditLogsError && (
        <>
          {!auditLogs || auditLogs.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No Audit Logs Found"
              description="There are no audit logs matching your filters."
            />
          ) : (
            <>
              <AuditLogTable
                auditLogs={auditLogs}
                onViewDetails={handleViewDetails}
              />
              {pagination && (
                <Pagination
                  pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalStudents: pagination.totalLogs,
                    hasNextPage: pagination.hasNextPage,
                    hasPrevPage: pagination.hasPrevPage,
                    limit: pagination.limit,
                  }}
                />
              )}
            </>
          )}
        </>
      )}

      <AuditLogDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        auditLog={selectedLog}
      />
    </div>
  );
}

