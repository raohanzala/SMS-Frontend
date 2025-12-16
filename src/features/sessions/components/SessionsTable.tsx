import React, { useMemo } from "react";
import Table from "@/components/common/Table";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { formatShortDate } from "@/utils/helpers";
import { SessionsTableProps } from "../types/session-components.types";
import { Session } from "../types/session.types";

const SessionsTable = ({
  sessions,
  onEditSession,
  onDeleteSession,
  selectedSessions,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
}: SessionsTableProps) => {

  const sessionColumns = [
    {
      key: "name",
      header: "Session Name",
      render: (row: Session) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      render: (row: Session) => formatShortDate(row.startDate),
    },
    {
      key: "endDate",
      header: "End Date",
      render: (row: Session) => formatShortDate(row.endDate),
    },
    {
      key: "isActive",
      header: "Status",
      render: (row: Session) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: Session) => formatShortDate(row.createdAt || ""),
    },
    {
      key: "actions",
      header: "Actions",
      render: (
        row: Session & {
          onEditSession: (row: Session) => void;
          onDeleteSession: (id: string) => void;
        }
      ) => (
        <div className="flex justify-end space-x-2">
          <EditButton onClick={() => row?.onEditSession?.(row)} />
          <DeleteButton onClick={() => row?.onDeleteSession?.(row._id)} />
        </div>
      ),
      width: "120px",
    },
  ];

  const sessionsTableData = useMemo(() => 
    sessions.map((item) => ({
      ...item,
      onEditSession,
      onDeleteSession,
    })),
    [sessions, onEditSession, onDeleteSession]
  );

  return (
    <Table
      title="Sessions"
      data={sessionsTableData}
      columns={sessionColumns}
      selectable={true}
      selectedRows={selectedSessions}
      onToggleSelect={onToggleSelect}
      onSelectAll={onSelectAll}
      onDeselectAll={onDeselectAll}
    />
  );
};

export default React.memo(SessionsTable);

