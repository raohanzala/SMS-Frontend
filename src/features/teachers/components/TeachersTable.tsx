import React from "react";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { TeachersTableProps } from "../types/teacher-components.types";
import { formatShortDate } from "@/utils/helpers";

const TeachersTable = React.memo(
  ({ teachers, onEditTeacher, onDeleteTeacher }: TeachersTableProps) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Teachers ({teachers?.length || 0})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Classes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers?.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-50">
                  {/* Teacher info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          src={
                            teacher.profileImage ||
                            (teacher.gender === "female"
                              ? "/female-teacher-avatar.jpg"
                              : "/male-teacher-avatar.jpg")
                          }
                          alt={teacher.name}
                          className="h-14 w-14 rounded-full object-cover border"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {teacher.name}
                        </div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teacher.phone ? (
                      <div className="text-sm text-gray-900">{teacher.phone}</div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No phone</span>
                    )}
                  </td>

                  {/* Assigned Classes */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teacher.assignedClasses && teacher.assignedClasses.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {teacher.assignedClasses.map((cls: { _id: string; name: string; section: string } | string) => {
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
                              {cls.name} - {cls.section}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No classes assigned</span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatShortDate(teacher.createdAt || "")}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <ViewButton navigateTo={`/admin/teachers/${teacher._id}`} />
                      <EditButton onClick={() => onEditTeacher(teacher)} />
                      <DeleteButton onClick={() => onDeleteTeacher(teacher._id)} />
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

TeachersTable.displayName = "TeachersTable";

export default TeachersTable;

