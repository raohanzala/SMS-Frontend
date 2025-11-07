import React from "react";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { EmployeesTableProps } from "../types/employee-components.types";
import { formatShortDate } from "@/utils/helpers";

const EmployeesTable = React.memo(
  ({ employees, onEditEmployee, onDeleteEmployee }: EmployeesTableProps) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Employees ({employees?.length || 0})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Classes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Joining
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees?.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  {/* Employee info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          src={
                            employee.profileImage ||
                            (employee.gender === "female"
                              ? "/female-teacher-avatar.jpg"
                              : "/male-teacher-avatar.jpg")
                          }
                          alt={employee.name}
                          className="h-14 w-14 rounded-full object-cover border"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Designation */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                      {employee.designation || "N/A"}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.phone ? (
                      <div className="text-sm text-gray-900">{employee.phone}</div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No phone</span>
                    )}
                  </td>

                  {/* Assigned Classes */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.assignedClasses && employee.assignedClasses.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {employee.assignedClasses.map((cls: { _id: string; name: string } | string) => {
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
                        })}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No classes assigned</span>
                    )}
                  </td>

                  {/* Date of Joining */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatShortDate(employee.dateOfJoining || "")}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <ViewButton navigateTo={`/admin/employees/${employee._id}`} />
                      <EditButton onClick={() => onEditEmployee(employee)} />
                      <DeleteButton onClick={() => onDeleteEmployee(employee._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

EmployeesTable.displayName = "EmployeesTable";

export default EmployeesTable;

