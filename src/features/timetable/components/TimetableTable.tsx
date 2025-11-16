import React from "react";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { TimetableTableProps } from "../types/timetable-components.types";

const TimetableTable = React.memo(
  ({ timetables, onEditTimetable, onDeleteTimetable }: TimetableTableProps) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Timetable Entries ({timetables?.length || 0})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {timetables?.map((timetable) => {
                const className =
                  typeof timetable.class === "object"
                    ? timetable.class?.name
                    : "—";
                const teacherName =
                  typeof timetable.teacher === "object"
                    ? timetable.teacher?.name
                    : "—";

                return (
                  <tr key={timetable._id} className="hover:bg-gray-50">
                    {/* Class */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {className}
                    </td>

                    {/* Day */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timetable.day}
                    </td>

                    {/* Period */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timetable.period}
                    </td>

                    {/* Time */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timetable.startTime} - {timetable.endTime}
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timetable.subject}
                    </td>

                    {/* Teacher */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacherName}
                      {timetable.isSubstitute && (
                        <span className="ml-2 text-xs text-orange-600 font-medium">
                          (Substitute)
                        </span>
                      )}
                    </td>

                    {/* Room */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timetable.room || "—"}
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {timetable.isSubstitute ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                          Substitute
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Regular
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <EditButton onClick={() => onEditTimetable(timetable)} />
                        <DeleteButton
                          onClick={() => onDeleteTimetable(timetable._id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

TimetableTable.displayName = "TimetableTable";

export default TimetableTable;

