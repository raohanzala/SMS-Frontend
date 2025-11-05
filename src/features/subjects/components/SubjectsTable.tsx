import React from "react";
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { SubjectsTableProps } from "../types/subject-components.types";

const SubjectsTable = React.memo(
  ({ subjects, onEditSubject, onDeleteSubject }: SubjectsTableProps) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Subjects ({subjects?.length || 0})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {subjects?.map((subject) => (
                <tr key={subject._id} className="hover:bg-gray-50">
                  {/* Subject Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.subjects?.[0]?.name || "—"}
                  </td>

                  {/* Code */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.code || "—"}
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof subject.class === "object" && subject.class
                      ? `${subject.class.name} (${subject.class.section})`
                      : "—"}
                  </td>

                  {/* Assigned Teacher */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subject.assignedTeacher ? (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              subject.assignedTeacher.profileImage ||
                              "/default-avatar.png"
                            }
                            alt={subject.assignedTeacher.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {subject.assignedTeacher.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {subject.assignedTeacher.email}
                          </div>
                        </div>
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.createdAt
                      ? new Date(subject.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <ViewButton navigateTo={`/admin/subjects/${subject._id}`} />
                      <EditButton onClick={() => onEditSubject(subject)} />
                      <DeleteButton onClick={() => onDeleteSubject(subject._id)} />
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

SubjectsTable.displayName = "SubjectsTable";

export default SubjectsTable;

