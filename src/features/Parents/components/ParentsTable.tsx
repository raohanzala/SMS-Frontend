import React from "react";
import Table from "@/components/common/Table";
import ViewButton from '@/components/common/ViewButton';
import EditButton from '@/components/common/EditButton';
import DeleteButton from '@/components/common/DeleteButton';
import { ParentsTableProps } from '../types/parent-components.interface';
import { Parent } from '../types/parent.types';
import { formatShortDate } from '@/utils/helpers';

const ParentsTable = ({
  onEditParent,
  onDeleteParent,
  parents,
  selectedParents,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
}: ParentsTableProps) => {
  const parentColumns = [
    {
      key: "parent",
      header: "Parent",
      render: (row: Parent) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={(row as Parent & { profileImage?: string }).profileImage || "/parents-avatar.png"}
              alt={row.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.name}
            </div>
            <div className="text-sm text-gray-500">{row.email || "—"}</div>
          </div>
        </div>
      ),
    },
    {
      key: "children",
      header: "Children",
      render: (row: Parent) =>
        row.children && row.children.length > 0 ? (
          <div className="text-sm text-gray-900">
            {row.children.map((child) => child.name).join(", ")}
          </div>
        ) : (
          <span className="text-sm text-gray-400 italic">No children</span>
        ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (row: Parent) =>
        row.phone ? (
          <div className="text-sm text-gray-900">{row.phone}</div>
        ) : (
          <span className="text-sm text-gray-400 italic">No phone</span>
        ),
    },
    {
      key: "joined",
      header: "Joined",
      render: (row: Parent) => formatShortDate((row as Parent & { createdAt?: string }).createdAt || ""),
    },
    {
      key: "actions",
      header: "Actions",
      render: (
        row: Parent & {
          onEditParent: (row: Parent) => void;
          onDeleteParent: (id: string) => void;
        }
      ) => (
        <div className="flex justify-end space-x-2">
          <ViewButton navigateTo={`/admin/parents/${row._id}`} />
          <EditButton onClick={() => row?.onEditParent?.(row)} />
          <DeleteButton onClick={() => row?.onDeleteParent?.(row._id)} />
        </div>
      ),
      width: "150px",
    },
  ];

  const parentsTableData = parents.map((item) => ({
    ...item,
    onEditParent,
    onDeleteParent,
  }));

  return (
    <Table
      title="Parents"
      data={parentsTableData}
      columns={parentColumns}
      selectable={true}
      selectedRows={selectedParents}
      onToggleSelect={onToggleSelect}
      onSelectAll={onSelectAll}
      onDeselectAll={onDeselectAll}
    />
  );
};

export default React.memo(ParentsTable);