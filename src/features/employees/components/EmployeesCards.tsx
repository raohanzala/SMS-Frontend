import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ViewButton from "@/components/common/ViewButton";
import React from "react";
import { EmployeesTableProps } from "../types/employee-components.types";
import { formatShortDate } from "@/utils/helpers";

const EmployeesCards = React.memo(
  ({ employees, onEditEmployee, onDeleteEmployee }: EmployeesTableProps) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {employees?.map((employee) => (
          <div
            key={employee._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col relative"
          >
            {/* Gender Label */}
            <span
              className={`absolute top-3 right-3 text-xs font-medium flex justify-center pt-[2px] items-center h-6 px-2 rounded-full ${
                employee.gender === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {employee.gender === "female" ? "Female" : "Male"}
            </span>

            {/* Top Section - Avatar + Name */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  employee.profileImage ? employee.profileImage : employee.gender === "female"
                    ? "/female-teacher-avatar.jpg"
                    : "/male-teacher-avatar.jpg"
                }
                alt={employee.name}
                className="h-14 w-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  {employee.name}
                </h4>
                <p className="text-xs text-gray-500 capitalize">
                  {employee.designation || "N/A"}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-3">
              <p className="text-sm text-gray-700 font-medium">
                {employee.email || "No email"}
              </p>
              <p className="text-xs text-gray-500">
                {employee.phone || "No phone"}
              </p>
            </div>

            {/* Assigned Classes */}
            {employee.assignedClasses && employee.assignedClasses.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">
                  Classes: {employee.assignedClasses.length}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {employee.assignedClasses.map((cls: { _id?: string; name?: string } | string) => {
                    const className = typeof cls === "string" ? cls : cls.name || "Unknown";
                    return className;
                  }).join(", ")}
                </p>
              </div>
            )}

            {/* Date of Joining */}
            {employee.dateOfJoining && (
              <div className="mt-2">
                <p className="text-xs text-gray-400">
                  Joined: {formatShortDate(employee.dateOfJoining || "")}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex justify-end space-x-2">
              <ViewButton navigateTo={`/admin/employees/${employee._id}`} />
              <EditButton onClick={() => onEditEmployee(employee)} />
              <DeleteButton onClick={() => onDeleteEmployee(employee._id)} />
            </div>
          </div>
        ))}
      </div>
    );
  }
);

EmployeesCards.displayName = "EmployeesCards";

export default EmployeesCards;

