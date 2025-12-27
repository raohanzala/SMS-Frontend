import React from "react";
import Table from "@/components/common/Table";
import { StudentFee } from "../types/fee.types";
import { formatShortDate } from "@/utils/helpers";
import Button from "@/components/common/Button";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StudentFeesTableProps {
  fees: StudentFee[];
  onPayFee?: (fee: StudentFee) => void;
  canPay?: boolean;
}

interface StudentFeesTableRow extends StudentFee {
  onPayFee?: (fee: StudentFee) => void;
  canPay?: boolean;
}

const StudentFeesTable = ({
  fees,
  onPayFee,
  canPay = false,
}: StudentFeesTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Paid
          </span>
        );
      case "PARTIAL":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <Clock className="w-3.5 h-3.5" />
            Partial
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      default:
        return <span className="text-sm text-gray-500">{status}</span>;
    }
  };

  const feeColumns = [
    {
      key: "student",
      header: "Student",
      render: (row: StudentFeesTableRow) => {
        const student = typeof row.studentId === "object" ? row.studentId : null;
        return (
          <div>
            <span className="font-medium text-gray-900 block">
              {student?.name || "—"}
            </span>
            {student?.rollNumber && (
              <span className="text-xs text-gray-500">Roll: {student.rollNumber}</span>
            )}
          </div>
        );
      },
    },
    {
      key: "session",
      header: "Session",
      render: (row: StudentFeesTableRow) => {
        const session = typeof row.sessionId === "object" ? row.sessionId : null;
        return <span className="text-sm text-gray-700">{session?.name || "—"}</span>;
      },
    },
    {
      key: "month",
      header: "Month",
      render: (row: StudentFeesTableRow) => (
        <span className="text-sm text-gray-700">{row.month} {row.year}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (row: StudentFeesTableRow) => (
        <span className="font-medium text-gray-900">
          {row.amount.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "paidAmount",
      header: "Paid",
      render: (row: StudentFeesTableRow) => (
        <span className="text-sm text-gray-700">
          {row.paidAmount.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "remaining",
      header: "Remaining",
      render: (row: StudentFeesTableRow) => {
        const remaining = row.amount - row.paidAmount;
        return (
          <span className={`font-medium ${remaining > 0 ? "text-red-600" : "text-green-600"}`}>
            {remaining.toLocaleString()} PKR
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (row: StudentFeesTableRow) => getStatusBadge(row.status),
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (row: StudentFeesTableRow) => (
        <span className="text-sm text-gray-700">
          {formatShortDate(row.dueDate)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: StudentFeesTableRow) => {
        if (!canPay || row.status === "PAID") return null;
        return (
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => row.onPayFee?.(row)}
            >
              Pay
            </Button>
          </div>
        );
      },
      width: "100px",
    },
  ];

  const tableData = fees.map((fee) => ({
    ...fee,
    onPayFee,
    canPay,
  }));

  return (
    <Table
      title="Student Fees"
      data={tableData}
      columns={feeColumns}
      selectable={false}
    />
  );
};

export default StudentFeesTable;

