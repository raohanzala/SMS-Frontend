import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Activity } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuditLogs } from "../hooks/useAuditLogs";
import AuditLogTable from "../components/AuditLogTable";
import AuditLogFilters from "../components/AuditLogFilters";
import AuditLogDetailsModal from "../components/AuditLogDetailsModal";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import { AuditLog } from "@/api/auditLogs";

export default function AdminActivityLogsPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Set userId in URL params on mount if not already set
  useEffect(() => {
    if (user?._id && !searchParams.get("userId")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("userId", user._id);
      setSearchParams(newParams, { replace: true });
    }
  }, [user?._id, searchParams, setSearchParams]);

  // Lock user filter to current user for admin
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
        <h1 className="text-2xl font-bold text-text-primary">Activity Logs</h1>
        <p className="text-sm text-text-secondary mt-1">
          View your activity history
        </p>
      </div>

      <AuditLogFilters
        showCampusFilter={false}
        userIdLocked={user?._id}
        userIdLabel={user?.name || "Current User"}
      />

      {isAuditLogsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {auditLogsError && (
        <ErrorMessage
          message={auditLogsError.message || "Failed to load activity logs"}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isAuditLogsLoading && !auditLogsError && (
        <>
          {!auditLogs || auditLogs.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No Activity Logs Found"
              description="There are no activity logs matching your filters."
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

