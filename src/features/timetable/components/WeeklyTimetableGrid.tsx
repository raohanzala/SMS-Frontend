import React from "react";
import { WeeklyTimetableGridProps } from "../types/timetable-components.types";
import { TimetableEntry } from "../types/timetable.types";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { FiClock, FiMapPin, FiUser } from "react-icons/fi";

const WeeklyTimetableGrid = ({
  timetable,
  title,
  showActions = false,
  onEdit,
  onDelete,
}: WeeklyTimetableGridProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

  // Find the maximum period number across all days
  const maxPeriod = Math.max(
    ...days.map((day) => {
      const entries = timetable[day] || [];
      return entries.length > 0
        ? Math.max(...entries.map((e) => e.period))
        : 0;
    }),
    8 // Default to 8 periods if no entries
  );

  // Create a map of day -> period -> entry for quick lookup
  const timetableMap: Record<string, Record<number, TimetableEntry>> = {};
  days.forEach((day) => {
    timetableMap[day] = {};
    (timetable[day] || []).forEach((entry) => {
      timetableMap[day][entry.period] = entry;
    });
  });

  const getEntryForPeriod = (day: string, period: number): TimetableEntry | null => {
    return timetableMap[day]?.[period] || null;
  };

  const getDayName = (day: string) => {
    const dayNames: Record<string, string> = {
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
    };
    return dayNames[day] || day;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                Period
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]"
                >
                  {getDayName(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: maxPeriod }, (_, i) => i + 1).map((period) => (
              <tr key={period} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                  Period {period}
                </td>
                {days.map((day) => {
                  const entry = getEntryForPeriod(day, period);
                  return (
                    <td
                      key={`${day}-${period}`}
                      className="px-4 py-3 text-sm border-r border-gray-100"
                    >
                      {entry ? (
                        <div
                          className={`p-3 rounded-lg border ${
                            entry.isSubstitute
                              ? "bg-orange-50 border-orange-200"
                              : "bg-blue-50 border-blue-200"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">
                              {entry.subject}
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <FiClock className="mr-1" />
                              {entry.startTime} - {entry.endTime}
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <FiUser className="mr-1" />
                              {typeof entry.teacher === "object"
                                ? entry.teacher.name
                                : entry.teacher}
                              {entry.isSubstitute && (
                                <span className="ml-1 text-orange-600 font-medium">
                                  (Sub)
                                </span>
                              )}
                            </div>
                            {entry.room && (
                              <div className="flex items-center text-xs text-gray-600">
                                <FiMapPin className="mr-1" />
                                {entry.room}
                              </div>
                            )}
                            {entry.notes && (
                              <div className="text-xs text-gray-500 italic mt-1">
                                {entry.notes}
                              </div>
                            )}
                            {showActions && onEdit && onDelete && (
                              <div className="flex justify-end space-x-1 mt-2 pt-2 border-t border-gray-200">
                                <EditButton
                                  onClick={() => onEdit(entry)}
                                />
                                <DeleteButton
                                  onClick={() => onDelete(entry._id)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 text-xs py-2">
                          —
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyTimetableGrid;

