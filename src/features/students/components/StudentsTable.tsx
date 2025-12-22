import React from "react";
import { Student } from "../types/student.types";
import { formatShortDate } from "@/utils/helpers";
import { StudentsTableProps } from "../types/student-components.types";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import Table from "@/components/common/Table";

const StudentsTable = React.memo(
  ({
    onEditStudent,
    onDeleteStudent,
    students,
    selectedStudents,
    onToggleSelect,
    onSelectAll,
    onDeselectAll,
  }: StudentsTableProps) => {
    const studentColumns = [
      {
        key: "student",
        header: "Student",
        render: (row: Student) => (
          <div className="flex items-center">
            <img
              src={
                row.profileImage ||
                (row.gender === "female"
                  ? "/female-student-avatar.jpg"
                  : "/male-student-avatar.jpg")
              }
              alt={row.name}
              className="h-14 w-14 rounded-full object-cover border"
            />
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {row.name}
              </div>
              <div className="text-xs text-gray-500">
                Roll No: {row.rollNumber || "N/A"} |{" "}
                <span
                  className={`font-bold ${
                    row.gender === "female"
                      ? "text-pink-500"
                      : "text-blue-500"
                  }`}
                >
                  {row.gender}
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "class",
        header: "Class & Section",
        render: (row: Student) => (
          <span className="text-sm text-gray-900">
            {row.class?.name || "N/A"}
          </span>
        ),
      },
      {
        key: "guardians",
        header: "Guardians",
        render: (row: Student) =>
          row.guardians && row.guardians.length > 0 ? (
            <div>
              {row.guardians.map((g) => (
                <div key={g._id} className="flex flex-col">
                  <span className="font-medium">{g.parent?.name}</span>
                  <span className="text-xs text-gray-500">
                    {g.parent?.phone || "No phone"} -{" "}
                    <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">
                      {g.relation}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">No guardians</span>
          ),
      },
      {
        key: "contact",
        header: "Contact",
        render: (row: Student) => (
          <div>
            <div>{row.email || "No email"}</div>
            <div className="text-xs text-gray-500">
              {row.phone || "No phone"}
            </div>
          </div>
        ),
      },
      {
        key: "admissionDate",
        header: "Admission Date",
        render: (row: Student) => formatShortDate(row.createdAt || ""),
      },
      {
        key: "actions",
        header: "Actions",
        render: (
          row: Student & {
            onEditStudent: (row: Student) => void;
            onDeleteStudent: (id: string) => void;
          }
        ) => (
          <div className="flex justify-end space-x-2">
            <ViewButton navigateTo={`/admin/students/${row._id}`} />
            <EditButton onClick={() => row?.onEditStudent?.(row)} />
            <DeleteButton onClick={() => row?.onDeleteStudent?.(row._id)} />
          </div>
        ),
        width: "150px",
      },
    ];

    const studentsTableData = students.map((item) => ({
      ...item,
      onEditStudent,
      onDeleteStudent,
    }));

    return (
      <Table
        title="Students"
        data={studentsTableData}
        columns={studentColumns}
        selectable={true}
        selectedRows={selectedStudents}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
      />
    );
  }
);

StudentsTable.displayName = "StudentsTable";

export default StudentsTable;
