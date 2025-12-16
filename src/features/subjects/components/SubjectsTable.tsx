import React from "react";
import Table from "@/components/common/Table";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { SubjectsTableProps } from "../types/subject-components.types";
import { Subject } from "../types/subject.types";

const SubjectsTable = React.memo(
  ({
    subjects,
    onEditSubject,
    onDeleteSubject,
    selectedSubjects,
    onToggleSelect,
    onSelectAll,
    onDeselectAll,
  }: SubjectsTableProps) => {
    const subjectColumns = [
      {
        key: "name",
        header: "Subject Name",
        render: (row: Subject) => (
          <span className="text-sm font-medium text-gray-900">
            {row.name || "—"}
          </span>
        ),
      },
      {
        key: "code",
        header: "Code",
        render: (row: Subject) => (
          <span className="text-sm text-gray-500">{(row as Subject & { code?: string }).code || "—"}</span>
        ),
      },
      {
        key: "class",
        header: "Class",
        render: (row: Subject) => (
          <span className="text-sm text-gray-900">
            {typeof row.class === "object" && row.class
              ? `${row.class.name}${(row.class as { name: string; section?: string }).section ? ` (${(row.class as { name: string; section?: string }).section})` : ""}`
                      : "—"}
          </span>
        ),
      },
      {
        key: "teacher",
        header: "Assigned Teacher",
        render: (row: Subject) => {
          const assignedTeacher = (row as Subject & { assignedTeacher?: { name: string; email?: string; profileImage?: string } }).assignedTeacher;
          return assignedTeacher ? (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                  src={assignedTeacher.profileImage || "/default-avatar.png"}
                  alt={assignedTeacher.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                  {assignedTeacher.name}
                          </div>
                          <div className="text-sm text-gray-500">
                  {assignedTeacher.email}
                          </div>
                        </div>
                      </div>
                    ) : (
            <span className="text-sm text-gray-400">—</span>
          );
        },
      },
      {
        key: "createdAt",
        header: "Created At",
        render: (row: Subject) => (
          <span className="text-sm text-gray-500">
            {(row as Subject & { createdAt?: string }).createdAt
              ? new Date((row as Subject & { createdAt?: string }).createdAt || "").toLocaleDateString()
                      : "—"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (
          row: Subject & {
            onEditSubject: (row: Subject) => void;
            onDeleteSubject: (id: string) => void;
          }
        ) => (
                    <div className="flex justify-end space-x-2">
            <ViewButton navigateTo={`/admin/subjects/${row._id}`} />
            <EditButton onClick={() => row?.onEditSubject?.(row)} />
            <DeleteButton onClick={() => row?.onDeleteSubject?.(row._id)} />
                    </div>
        ),
        width: "150px",
      },
    ];

    const subjectsTableData = subjects.map((item) => ({
      ...item,
      onEditSubject,
      onDeleteSubject,
    }));

    return (
      <Table
        title="Subjects"
        data={subjectsTableData}
        columns={subjectColumns}
        selectable={true}
        selectedRows={selectedSubjects}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
      />
    );
  }
);

SubjectsTable.displayName = "SubjectsTable";

export default SubjectsTable;

