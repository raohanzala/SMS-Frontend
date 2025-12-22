import React, { useMemo } from "react";
import Table from "@/components/common/Table";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { formatShortDate } from "@/utils/helpers";
import { ClassesTableProps } from "../types/class-components.interface";
import { Class } from "../types/class.types";

const ClassesTable = ({
  classes,
  onEditClass,
  onDeleteClass,
  selectedClasses,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
}: ClassesTableProps) => {

  const classColumns = [
    {
      key: "name",
      header: "Class Name",
      render: (row: Class) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "monthlyFee",
      header: "Monthly Fee",
      render: (row: Class) =>
        row.monthlyFee ? `${row.monthlyFee.toLocaleString()} PKR` : "—",
    },
    {
      key: "classTeacher",
      header: "Class Teacher",
      render: (row: Class) =>
        typeof row.classTeacher === "object"
          ? row.classTeacher?.name || "—"
          : row.classTeacher || "—",
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: Class) => formatShortDate(row.createdAt || ""),
    },
    {
      key: "actions",
      header: "Actions",
      render: (
        row: Class & {
          onEditClass: (row: Class) => void;
          onDeleteClass: (id: string) => void;
        }
      ) => (
        <div className="flex justify-end space-x-2">
          <ViewButton navigateTo={`/admin/classes/${row._id}`} />
          <EditButton onClick={() => row?.onEditClass?.(row)} />
          <DeleteButton onClick={() => row?.onDeleteClass?.(row._id)} />
        </div>
      ),
      width: "150px",
    },
  ];

  const classesTableData = useMemo(() => 
    classes?.map((item) => ({
      ...item,
      onEditClass,
      onDeleteClass,
    })),
    [classes, onEditClass, onDeleteClass]
  );

  return (
    <Table
      title="Classes"
      data={classesTableData}
      columns={classColumns}
      selectable={true}
      selectedRows={selectedClasses}
      onToggleSelect={onToggleSelect}
      onSelectAll={onSelectAll}
      onDeselectAll={onDeselectAll}
    />
  );
};

export default React.memo(ClassesTable);
