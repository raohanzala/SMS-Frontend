import Modal from "@/components/common/Modal";
import { AuditLog } from "@/api/auditLogs";
import { formatDateTime } from "@/utils/helpers";

interface AuditLogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditLog: AuditLog | null;
}

export default function AuditLogDetailsModal({
  isOpen,
  onClose,
  auditLog,
}: AuditLogDetailsModalProps) {
  if (!auditLog) return null;

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const getUserName = (user: AuditLog["userId"]): string => {
    if (typeof user === "object" && user !== null) {
      return user.name || user.email || "Unknown";
    }
    return "Unknown";
  };

  const getUserEmail = (user: AuditLog["userId"]): string => {
    if (typeof user === "object" && user !== null) {
      return user.email || "N/A";
    }
    return "N/A";
  };

  const getUserRole = (user: AuditLog["userId"]): string => {
    if (typeof user === "object" && user !== null) {
      return user.role || "N/A";
    }
    return "N/A";
  };

  const getCampusName = (campus: AuditLog["campusId"]): string => {
    if (!campus) return "N/A";
    if (typeof campus === "object" && campus !== null) {
      return campus.name || "Unknown";
    }
    return "N/A";
  };

  const getSchoolName = (school: AuditLog["schoolId"]): string => {
    if (!school) return "N/A";
    if (typeof school === "object" && school !== null) {
      return school.name || "Unknown";
    }
    return "N/A";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Log Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
              Action
            </label>
            <p className="mt-1 text-sm text-text-primary">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                {auditLog.action.replace(/_/g, " ")}
              </span>
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
              Entity
            </label>
            <p className="mt-1 text-sm text-text-primary">{auditLog.entity}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
              Entity ID
            </label>
            <p className="mt-1 text-sm text-text-primary font-mono">
              {auditLog.entityId}
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
              Timestamp
            </label>
            <p className="mt-1 text-sm text-text-primary">
              {formatDateTime(auditLog.createdAt)}
            </p>
          </div>
        </div>

        {/* User Information */}
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            User Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Name
              </label>
              <p className="mt-1 text-sm text-text-primary">
                {getUserName(auditLog.userId)}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Email
              </label>
              <p className="mt-1 text-sm text-text-primary">
                {getUserEmail(auditLog.userId)}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Role
              </label>
              <p className="mt-1 text-sm text-text-primary">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {getUserRole(auditLog.userId)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            Location Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Campus
              </label>
              <p className="mt-1 text-sm text-text-primary">
                {getCampusName(auditLog.campusId)}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                School
              </label>
              <p className="mt-1 text-sm text-text-primary">
                {getSchoolName(auditLog.schoolId)}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                IP Address
              </label>
              <p className="mt-1 text-sm text-text-primary font-mono">
                {auditLog.ipAddress || "N/A"}
              </p>
            </div>
            {auditLog.userAgent && (
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                  User Agent
                </label>
                <p className="mt-1 text-xs text-text-primary font-mono break-all">
                  {auditLog.userAgent}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Changes */}
        {(auditLog.oldValue || auditLog.newValue) && (
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Changes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditLog.oldValue && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    Old Value
                  </label>
                  <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto max-h-64">
                    {formatValue(auditLog.oldValue)}
                  </pre>
                </div>
              )}
              {auditLog.newValue && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 block">
                    New Value
                  </label>
                  <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto max-h-64">
                    {formatValue(auditLog.newValue)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Metadata */}
        {auditLog.metadata && Object.keys(auditLog.metadata).length > 0 && (
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Metadata
            </h3>
            <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto max-h-48">
              {formatValue(auditLog.metadata)}
            </pre>
          </div>
        )}
      </div>
    </Modal>
  );
}

