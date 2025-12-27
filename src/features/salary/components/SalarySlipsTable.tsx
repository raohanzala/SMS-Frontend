import React from "react";
import Table from "@/components/common/Table";
import { SalarySlip } from "../types/salary.types";
import Button from "@/components/common/Button";
import { CheckCircle, XCircle, Download } from "lucide-react";

interface SalarySlipsTableProps {
  salarySlips: SalarySlip[];
  onMarkPaid?: (id: string) => void;
  onDownload?: (salarySlip: SalarySlip) => void;
  canMarkPaid?: boolean;
  isMarkingPaid?: boolean;
}

interface SalarySlipsTableRow extends SalarySlip {
  onMarkPaid?: (id: string) => void;
  onDownload?: (salarySlip: SalarySlip) => void;
  canMarkPaid?: boolean;
  isMarkingPaid?: boolean;
}

const SalarySlipsTable = ({
  salarySlips,
  onMarkPaid,
  onDownload,
  canMarkPaid = false,
  isMarkingPaid = false,
}: SalarySlipsTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Paid
          </span>
        );
      case "UNPAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            Unpaid
          </span>
        );
      default:
        return <span className="text-sm text-gray-500">{status}</span>;
    }
  };

  const getEmployeeTypeBadge = (type: string) => {
    const typeConfig = {
      TEACHER: {
        label: "Teacher",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      },
      STAFF: {
        label: "Staff",
        className: "bg-purple-50 text-purple-700 border-purple-200",
      },
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

  const salarySlipsColumns = [
    {
      key: "employee",
      header: "Employee",
      render: (row: SalarySlipsTableRow) => (
        <div>
          <span className="font-medium text-gray-900 block">
            {row.employee?.name || "—"}
          </span>
          {row.employee?.designation && (
            <span className="text-xs text-gray-500">{row.employee.designation}</span>
          )}
        </div>
      ),
    },
    {
      key: "employeeType",
      header: "Type",
      render: (row: SalarySlipsTableRow) => getEmployeeTypeBadge(row.employeeType),
    },
    {
      key: "period",
      header: "Period",
      render: (row: SalarySlipsTableRow) => (
        <span className="text-sm text-gray-700">
          {row.month} {row.year}
        </span>
      ),
    },
    {
      key: "basicSalary",
      header: "Basic Salary",
      render: (row: SalarySlipsTableRow) => (
        <span className="font-medium text-gray-900">
          {row.basicSalary.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "deductions",
      header: "Deductions",
      render: (row: SalarySlipsTableRow) => (
        <span className="text-sm text-red-600">
          -{row.deductions.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "netSalary",
      header: "Net Salary",
      render: (row: SalarySlipsTableRow) => (
        <span className="font-bold text-green-600">
          {row.netSalary.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: SalarySlipsTableRow) => getStatusBadge(row.status),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: SalarySlipsTableRow) => (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => row.onDownload?.(row)}
            startIcon={<Download className="h-4 w-4" />}
          >
            Download
          </Button>
          {canMarkPaid && row.status === "UNPAID" && (
            <Button
              variant="success"
              size="sm"
              onClick={() => row.onMarkPaid?.(row._id)}
              disabled={row.isMarkingPaid}
              loading={row.isMarkingPaid}
            >
              Mark Paid
            </Button>
          )}
        </div>
      ),
      width: "200px",
    },
  ];

  const tableData = salarySlips.map((slip) => ({
    ...slip,
    onMarkPaid,
    onDownload,
    canMarkPaid,
    isMarkingPaid,
  }));

  return (
    <Table
      title="Salary Slips"
      data={tableData}
      columns={salarySlipsColumns}
      selectable={false}
    />
  );
};

export default SalarySlipsTable;

