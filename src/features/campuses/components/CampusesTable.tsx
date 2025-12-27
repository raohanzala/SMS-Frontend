import React from "react";
import Table from "@/components/common/Table";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { Campus } from "../types/campus.types";
import { isMainCampus } from "../types/campus.types";
import { formatShortDate } from "@/utils/helpers";
import { Building2, CheckCircle, XCircle } from "lucide-react";

interface CampusesTableProps {
  campuses: Campus[];
  onEditCampus: (campus: Campus) => void;
  onDeleteCampus: (campusId: string) => void;
  onSwitchCampus?: (campusId: string) => void;
  currentCampusId?: string;
}

const CampusesTable = ({
  campuses,
  onEditCampus,
  onDeleteCampus,
  onSwitchCampus,
  currentCampusId,
}: CampusesTableProps) => {
  const campusColumns = [
    {
      key: "name",
      header: "Campus",
      render: (row: Campus) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{row.name}</span>
              {isMainCampus(row) && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  Default
                </span>
              )}
              {currentCampusId === row._id && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  Current
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">{row.code}</span>
          </div>
        </div>
      ),
    },
    {
      key: "address",
      header: "Address",
      render: (row: Campus) => (
        <span className="text-sm text-gray-700">{row.address || "—"}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (row: Campus) => (
        <span className="text-sm text-gray-700">{row.phone || "—"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Campus) => (
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
      render: (
        row: Campus & {
          onEditCampus: (campus: Campus) => void;
          onDeleteCampus: (id: string) => void;
          onSwitchCampus?: (id: string) => void;
          isMain: boolean;
          isCurrent: boolean;
        }
      ) => (
        <div className="flex justify-end items-center gap-2">
          {onSwitchCampus && !row.isCurrent && row.isActive && (
            <button
              onClick={() => row.onSwitchCampus?.(row._id)}
              className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
            >
              Switch
            </button>
          )}
          <EditButton onClick={() => row.onEditCampus(row)} />
          {!row.isMain && (
            <DeleteButton onClick={() => row.onDeleteCampus(row._id)} />
          )}
        </div>
      ),
      width: "200px",
    },
  ];

  const campusesTableData = campuses.map((item) => ({
    ...item,
    onEditCampus,
    onDeleteCampus,
    onSwitchCampus,
    isMain: isMainCampus(item),
    isCurrent: currentCampusId === item._id,
  }));

  return (
    <Table
      title="Campuses"
      data={campusesTableData}
      columns={campusColumns}
      selectable={false}
    />
  );
};

export default CampusesTable;

