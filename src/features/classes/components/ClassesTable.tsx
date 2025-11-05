import React from 'react';
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { ClassesTableProps } from '../types/class-components.interface';

const ClassesTable = React.memo(
  ({ classes, onEditClass, onDeleteClass }: ClassesTableProps) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Classes ({classes?.length || 0})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Teachers
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
              {classes?.map((classItem) => (
                <tr key={classItem._id} className="hover:bg-gray-50">
                  {/* Class Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {classItem.name}
                  </td>

                  {/* Section */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {classItem.section}
                  </td>

                  {/* Subjects */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.subjects && classItem.subjects.length > 0
                      ? (Array.isArray(classItem.subjects) && classItem.subjects.length > 0 && typeof classItem.subjects[0] === 'object'
                          ? (classItem.subjects as Array<{ _id: string; name: string }>).map((sub) => sub.name).join(', ')
                          : (classItem.subjects as string[]).join(', '))
                      : '—'}
                  </td>

                  {/* Assigned Teachers */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.assignedTeachers && classItem.assignedTeachers.length > 0 ? (
                      <div className="flex flex-col space-y-1">
                        {classItem.assignedTeachers.map((teacher: { _id: string; name: string; email?: string; profileImage?: string } | string) => {
                          const teacherObj = typeof teacher === 'object' ? teacher : { _id: teacher, name: 'N/A' };
                          return (
                            <div key={teacherObj._id} className="flex items-center space-x-2">
                              {teacherObj.profileImage ? (
                                <img
                                  src={teacherObj.profileImage}
                                  alt={teacherObj.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                                  {teacherObj.name?.charAt(0)?.toUpperCase() || 'N'}
                                </div>
                              )}
                              <div className="flex flex-col leading-tight">
                                <span className="text-gray-900">{teacherObj.name}</span>
                                {teacherObj.email && (
                                  <span className="text-gray-400 text-xs">{teacherObj.email}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.createdAt ? new Date(classItem.createdAt).toLocaleDateString() : '—'}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <ViewButton navigateTo={`/admin/classes/${classItem._id}`} />
                      <EditButton onClick={() => onEditClass(classItem)} />
                      <DeleteButton onClick={() => onDeleteClass(classItem._id)} />
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

ClassesTable.displayName = "ClassesTable";

export default ClassesTable;