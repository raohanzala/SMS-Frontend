import React from 'react';
import ViewButton from "@/components/common/ViewButton";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { ClassesTableProps } from '../types/class-components.interface';
import { formatShortDate } from '@/utils/helpers';

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
                  Monthly Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Teacher
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

                  {/* Monthly Fee */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.monthlyTuitionFee 
                      ? `${classItem.monthlyTuitionFee.toLocaleString()} PKR`
                      : '—'}
                  </td>

                  {/* Class Teacher */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof classItem.classTeacher === "object" 
                      ? classItem.classTeacher?.name || '—'
                      : classItem.classTeacher || '—'}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatShortDate(classItem.createdAt || "")}
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