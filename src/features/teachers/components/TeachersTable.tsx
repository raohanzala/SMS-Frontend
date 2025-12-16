import React from "react";
import Table from "@/components/common/Table";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { TeachersTableProps } from "../types/teacher-components.types";
import { Teacher } from "../types/teacher.types";
import { formatShortDate } from "@/utils/helpers";

const TeachersTable = React.memo(
  ({
    teachers,
    onEditTeacher,
    onDeleteTeacher,
    selectedTeachers,
    onToggleSelect,
    onSelectAll,
    onDeselectAll,
  }: TeachersTableProps) => {
    const teacherColumns = [
      {
        key: "teacher",
        header: "Teacher",
        render: (row: Teacher) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                src={
                  row.profileImage ||
                  (row.gender === "female"
                    ? "/female-teacher-avatar.jpg"
                    : "/male-teacher-avatar.jpg")
                }
                alt={row.name}
                className="h-14 w-14 rounded-full object-cover border"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {row.name}
              </div>
              <div className="text-sm text-gray-500">{row.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: "contact",
        header: "Contact",
        render: (row: Teacher) =>
          row.phone ? (
            <div className="text-sm text-gray-900">{row.phone}</div>
          ) : (
            <span className="text-sm text-gray-400 italic">No phone</span>
          ),
      },
      {
        key: "assignedClasses",
        header: "Assigned Classes",
        render: (row: Teacher) =>
          row.assignedClasses && row.assignedClasses.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {row.assignedClasses.map(
                (cls: { _id: string; name: string; section?: string } | string) => {
                  if (typeof cls === "string") {
                    return (
                      <span
                        key={cls}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {cls}
                      </span>
                    );
                  }
                  return (
                    <span
                      key={cls._id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {cls.name}
                      {cls.section ? ` - ${cls.section}` : ""}
                    </span>
                  );
                }
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-400 italic">No classes assigned</span>
          ),
      },
      {
        key: "joined",
        header: "Joined",
        render: (row: Teacher) => formatShortDate(row.createdAt || ""),
      },
      {
        key: "actions",
        header: "Actions",
        render: (
          row: Teacher & {
            onEditTeacher: (row: Teacher) => void;
            onDeleteTeacher: (id: string) => void;
          }
        ) => (
          <div className="flex justify-end space-x-2">
            <ViewButton navigateTo={`/admin/teachers/${row._id}`} />
            <EditButton onClick={() => row?.onEditTeacher?.(row)} />
            <DeleteButton onClick={() => row?.onDeleteTeacher?.(row._id)} />
          </div>
        ),
        width: "150px",
      },
    ];

    const teachersTableData = teachers.map((item) => ({
      ...item,
      onEditTeacher,
      onDeleteTeacher,
    }));

    return (
      <Table
        title="Teachers"
        data={teachersTableData}
        columns={teacherColumns}
        selectable={true}
        selectedRows={selectedTeachers}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
      />
    );
  }
);

TeachersTable.displayName = "TeachersTable";

export default TeachersTable;

