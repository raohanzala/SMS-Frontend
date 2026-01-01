import React from "react";
import Table from "@/components/common/Table";
import EditButton from "@/components/common/EditButton";
import { formatShortDate } from "@/utils/helpers";
import { School } from "../types/schools.types";
import { Building2, CheckCircle, XCircle, Power } from "lucide-react";
import Button from "@/components/common/Button";

interface SchoolsTableProps {
  schools: School[];
  onEditSchool: (school: School) => void;
  onToggleStatus: (school: School) => void;
}

const SchoolsTable = ({ schools, onEditSchool, onToggleStatus }: SchoolsTableProps) => {
  const getOwnerEmail = (owner: School["ownerId"]): string => {
    if (typeof owner === "object" && owner !== null) {
      return owner.email || "N/A";
    }
    return "N/A";
  };

  const schoolColumns = [
    {
      key: "name",
      header: "School",
      render: (row: School) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.code}</div>
          </div>
        </div>
      ),
    },
    {
      key: "owner",
      header: "Owner",
      render: (row: School) => (
        <span className="text-sm text-gray-700">{getOwnerEmail(row.ownerId)}</span>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      render: (row: School) => (
        <span className="text-sm text-gray-700">{row.plan || "N/A"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: School) => (
        <div className="flex items-center gap-2">
          {row.isActive ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Active</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">Suspended</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: School) => (
        <span className="text-sm text-gray-700">{formatShortDate(row.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: School) => (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus(row)}
            startIcon={<Power className="w-4 h-4" />}
          >
            {row.isActive ? "Suspend" : "Activate"}
          </Button>
          <EditButton onClick={() => onEditSchool(row)} />
        </div>
      ),
      width: "200px",
    },
  ];

  return (
    <Table
      title="Schools"
      data={schools}
      columns={schoolColumns}
      selectable={false}
    />
  );
};

export default React.memo(SchoolsTable);

