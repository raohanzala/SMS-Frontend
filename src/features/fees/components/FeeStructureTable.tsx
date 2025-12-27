import React from "react";
import Table from "@/components/common/Table";
import EditButton from "@/components/common/EditButton";
import { FeeStructure } from "../types/fee.types";
import { formatShortDate } from "@/utils/helpers";
import { CheckCircle, XCircle } from "lucide-react";
import Button from "@/components/common/Button";

interface FeeStructureTableProps {
  feeStructures: FeeStructure[];
  onEditFeeStructure: (feeStructure: FeeStructure) => void;
  onToggleFeeStructure: (id: string) => void;
  isToggling: boolean;
}

interface FeeStructureTableRow extends FeeStructure {
  onEditFeeStructure: (feeStructure: FeeStructure) => void;
  onToggleFeeStructure: (id: string) => void;
  isToggling: boolean;
}

const FeeStructureTable = ({
  feeStructures,
  onEditFeeStructure,
  onToggleFeeStructure,
  isToggling,
}: FeeStructureTableProps) => {
  const feeStructureColumns = [
    {
      key: "class",
      header: "Class",
      render: (row: FeeStructureTableRow) => (
        <span className="font-medium text-gray-900">
          {typeof row.classId === "object" ? row.classId.name : row.classId}
        </span>
      ),
    },
    {
      key: "monthlyFee",
      header: "Monthly Fee",
      render: (row: FeeStructureTableRow) => (
        <span className="text-sm text-gray-700">
          {row.monthlyFee.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "admissionFee",
      header: "Admission Fee",
      render: (row: FeeStructureTableRow) => (
        <span className="text-sm text-gray-700">
          {row.admissionFee.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "examFee",
      header: "Exam Fee",
      render: (row: FeeStructureTableRow) => (
        <span className="text-sm text-gray-700">
          {row.examFee.toLocaleString()} PKR
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: FeeStructureTableRow) => (
        <div className="flex items-center gap-2">
          {row.isActive ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Active</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">Inactive</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: FeeStructureTableRow) => (
        <div className="flex justify-end items-center gap-2">
          <EditButton onClick={() => row.onEditFeeStructure(row)} />
          <Button
            variant={row.isActive ? "outline" : "primary"}
            size="sm"
            onClick={() => row.onToggleFeeStructure(row._id)}
            disabled={row.isToggling}
            loading={row.isToggling}
          >
            {row.isActive ? "Deactivate" : "Activate"}
          </Button>
        </div>
      ),
      width: "200px",
    },
  ];

  const tableData = feeStructures.map((item) => ({
    ...item,
    onEditFeeStructure,
    onToggleFeeStructure,
    isToggling,
  }));

  return (
    <Table
      title="Fee Structures"
      data={tableData}
      columns={feeStructureColumns}
      selectable={false}
    />
  );
};

export default FeeStructureTable;

