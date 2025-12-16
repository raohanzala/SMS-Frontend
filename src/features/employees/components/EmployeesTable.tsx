import React from "react";
import Table from "@/components/common/Table";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { EmployeesTableProps } from "../types/employee-components.types";
import { Employee } from "../types/employee.types";
import { formatShortDate } from "@/utils/helpers";

const EmployeesTable = React.memo(
  ({
    employees,
    onEditEmployee,
    onDeleteEmployee,
    selectedEmployees,
    onToggleSelect,
    onSelectAll,
    onDeselectAll,
  }: EmployeesTableProps) => {
    const employeeColumns = [
      {
        key: "employee",
        header: "Employee",
        render: (row: Employee) => (
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
        key: "designation",
        header: "Designation",
        render: (row: Employee) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
            {row.designation || "N/A"}
          </span>
        ),
      },
      {
        key: "contact",
        header: "Contact",
        render: (row: Employee) =>
          row.phone ? (
            <div className="text-sm text-gray-900">{row.phone}</div>
          ) : (
            <span className="text-sm text-gray-400 italic">No phone</span>
          ),
      },
      {
        key: "assignedClasses",
        header: "Assigned Classes",
        render: (row: Employee) =>
          row.assignedClasses && row.assignedClasses.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {row.assignedClasses.map(
                (cls: { _id: string; name: string } | string) => {
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
        key: "dateOfJoining",
        header: "Date of Joining",
        render: (row: Employee) => formatShortDate(row.dateOfJoining || ""),
      },
      {
        key: "actions",
        header: "Actions",
        render: (
          row: Employee & {
            onEditEmployee: (row: Employee) => void;
            onDeleteEmployee: (id: string) => void;
          }
        ) => (
          <div className="flex justify-end space-x-2">
            <ViewButton navigateTo={`/admin/employees/${row._id}`} />
            <EditButton onClick={() => row?.onEditEmployee?.(row)} />
            <DeleteButton onClick={() => row?.onDeleteEmployee?.(row._id)} />
          </div>
        ),
        width: "150px",
      },
    ];

    const employeesTableData = employees.map((item) => ({
      ...item,
      onEditEmployee,
      onDeleteEmployee,
    }));

    return (
      <Table
        title="Employees"
        data={employeesTableData}
        columns={employeeColumns}
        selectable={true}
        selectedRows={selectedEmployees}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
      />
    );
  }
);

EmployeesTable.displayName = "EmployeesTable";

export default EmployeesTable;

