import { useState } from "react";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";
import { AuditLog } from "@/api/auditLogs";
import { formatShortDate, formatDateTime } from "@/utils/helpers";
import Button from "@/components/common/Button";

interface AuditLogTableProps {
  auditLogs: AuditLog[];
  onViewDetails?: (log: AuditLog) => void;
}

export default function AuditLogTable({
  auditLogs,
  onViewDetails,
}: AuditLogTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                {/* Expand column */}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {auditLogs.map((log) => {
              const isExpanded = expandedRows.has(log._id);
              const hasChanges = log.oldValue || log.newValue;

              return (
                <>
                  <tr
                    key={log._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hasChanges ? (
                        <button
                          onClick={() => toggleRow(log._id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">
                          {formatShortDate(log.createdAt)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDateTime(log.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getUserName(log.userId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {getUserRole(log.userId)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                        {log.action.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.entity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getCampusName(log.campusId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {onViewDetails && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDetails(log)}
                          startIcon={<Eye className="w-4 h-4" />}
                        >
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                  {isExpanded && hasChanges && (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {log.oldValue && (
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700 mb-2">
                                Old Value
                              </h4>
                              <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto max-h-48">
                                {formatValue(log.oldValue)}
                              </pre>
                            </div>
                          )}
                          {log.newValue && (
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700 mb-2">
                                New Value
                              </h4>
                              <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto max-h-48">
                                {formatValue(log.newValue)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

