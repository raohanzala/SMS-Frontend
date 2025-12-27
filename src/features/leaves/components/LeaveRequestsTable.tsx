import React from "react";
import Table from "@/components/common/Table";
import { LeaveRequest } from "../types/leave.types";
import { formatShortDate } from "@/utils/helpers";
import Button from "@/components/common/Button";
import { CheckCircle, XCircle, Clock, Calendar } from "lucide-react";

interface LeaveRequestsTableProps {
  leaveRequests: LeaveRequest[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  canApprove?: boolean;
  isApproving?: boolean;
  isRejecting?: boolean;
}

interface LeaveRequestsTableRow extends LeaveRequest {
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  canApprove?: boolean;
  isApproving?: boolean;
  isRejecting?: boolean;
}

const LeaveRequestsTable = ({
  leaveRequests,
  onApprove,
  onReject,
  canApprove = false,
  isApproving = false,
  isRejecting = false,
}: LeaveRequestsTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      default:
        return <span className="text-sm text-gray-500">{status}</span>;
    }
  };

  const getLeaveTypeBadge = (type: string) => {
    const typeConfig = {
      SICK: { label: "Sick", className: "bg-red-50 text-red-700 border-red-200" },
      CASUAL: { label: "Casual", className: "bg-blue-50 text-blue-700 border-blue-200" },
      EMERGENCY: { label: "Emergency", className: "bg-orange-50 text-orange-700 border-orange-200" },
      OTHER: { label: "Other", className: "bg-gray-50 text-gray-700 border-gray-200" },
    };

    const config = typeConfig[type as keyof typeof typeConfig] || {
      label: type,
      className: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const leaveRequestsColumns = [
    {
      key: "user",
      header: "User",
      render: (row: LeaveRequestsTableRow) => {
        const user = typeof row.userId === "object" ? row.userId : null;
        return (
          <div>
            <span className="font-medium text-gray-900 block">{user?.email || "—"}</span>
            <span className="text-xs text-gray-500 capitalize">{user?.role || ""}</span>
          </div>
        );
      },
    },
    {
      key: "leaveType",
      header: "Leave Type",
      render: (row: LeaveRequestsTableRow) => getLeaveTypeBadge(row.leaveType),
    },
    {
      key: "dates",
      header: "Date Range",
      render: (row: LeaveRequestsTableRow) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4" />
          <span>{formatShortDate(row.fromDate)} - {formatShortDate(row.toDate)}</span>
        </div>
      ),
    },
    {
      key: "reason",
      header: "Reason",
      render: (row: LeaveRequestsTableRow) => (
        <span className="text-sm text-gray-700">{row.reason || "—"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: LeaveRequestsTableRow) => getStatusBadge(row.status),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: LeaveRequestsTableRow) => {
        if (!canApprove || row.status !== "PENDING") return null;
        return (
          <div className="flex justify-end items-center gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => row.onApprove?.(row._id)}
              disabled={row.isApproving || row.isRejecting}
              loading={row.isApproving}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => row.onReject?.(row._id)}
              disabled={row.isApproving || row.isRejecting}
              loading={row.isRejecting}
            >
              Reject
            </Button>
          </div>
        );
      },
      width: "180px",
    },
  ];

  const tableData = leaveRequests.map((request) => ({
    ...request,
    onApprove,
    onReject,
    canApprove,
    isApproving,
    isRejecting,
  }));

  return (
    <Table
      title="Leave Requests"
      data={tableData}
      columns={leaveRequestsColumns}
      selectable={false}
    />
  );
};

export default LeaveRequestsTable;

