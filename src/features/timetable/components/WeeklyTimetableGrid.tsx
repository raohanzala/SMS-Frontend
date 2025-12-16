import React, { useMemo } from "react";
import { WeeklyTimetableGridProps } from "../types/timetable-components.types";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { FiClock, FiMapPin, FiUser, FiCoffee } from "react-icons/fi";

interface TimetablePeriod {
  type: "period" | "break";
  period: number;
  startTime: string;
  endTime: string;
  subject: string | null;
  teacher: string | null;
  substituteTeacher: string | null;
  room?: string;
  notes?: string;
  _id?: string;
}

interface PeriodConfig {
  periodDuration: number;
  totalPeriods: number;
  breakAfterPeriods: number;
  breakDuration?: number;
}

const WeeklyTimetableGrid = ({
  timetable,
  title,
  periodConfig,
  showActions = false,
  onEdit,
  onDelete,
}: WeeklyTimetableGridProps & { periodConfig?: PeriodConfig }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

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

  // Process timetable data: filter out empty periods and identify breaks
  const processedTimetable = useMemo(() => {
    const processed: Record<string, Array<TimetablePeriod & { isBreak?: boolean }>> = {};
    const allPeriods = new Set<number>();

    // First pass: collect all periods that have configured subjects/teachers
    days.forEach((day) => {
      processed[day] = [];
      const dayEntries = (timetable[day] || []) as unknown as TimetablePeriod[];
      dayEntries.forEach((entry) => {
        // Only include periods with subject and teacher
        if (entry.subject && entry.teacher) {
          processed[day].push({
            type: entry.type || "period",
            period: entry.period,
            startTime: entry.startTime,
            endTime: entry.endTime,
            subject: entry.subject,
            teacher: entry.teacher,
            substituteTeacher: entry.substituteTeacher || null,
            room: entry.room,
            notes: entry.notes,
            _id: entry._id,
            isBreak: false,
          });
          allPeriods.add(entry.period);
        }
      });
    });

    // Second pass: add break rows based on periodConfig
    if (periodConfig?.breakAfterPeriods) {
      const sortedPeriods = Array.from(allPeriods).sort((a, b) => a - b);
      
      sortedPeriods.forEach((period, index) => {
        // Check if we need a break after this period
        if ((index + 1) % periodConfig.breakAfterPeriods === 0 && index < sortedPeriods.length - 1) {
          const nextPeriod = sortedPeriods[index + 1];
          const currentEntry = processed[days[0]].find((e) => e.period === period);
          const nextEntry = processed[days[0]].find((e) => e.period === nextPeriod);
          
          if (currentEntry && nextEntry) {
            // Calculate break time
            const breakStart = currentEntry.endTime;
            const breakEnd = nextEntry.startTime;
            
            // Add break row to all days
            days.forEach((day) => {
              const breakIndex = processed[day].findIndex((e) => e.period === period);
              if (breakIndex !== -1) {
                processed[day].splice(breakIndex + 1, 0, {
                  type: "break",
                  period: period + 0.5, // Use decimal to distinguish from regular periods
                  startTime: breakStart,
                  endTime: breakEnd,
                  subject: null,
                  teacher: null,
                  substituteTeacher: null,
                  isBreak: true,
                });
              }
            });
          }
        }
      });
    }

    // Sort by period number
    days.forEach((day) => {
      processed[day].sort((a, b) => a.period - b.period);
    });

    return processed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timetable, periodConfig]);

  // Get all unique periods (including breaks) across all days
  const allPeriods = useMemo(() => {
    const periods = new Set<number>();
    days.forEach((day) => {
      processedTimetable[day].forEach((entry) => {
        periods.add(entry.period);
      });
    });
    return Array.from(periods).sort((a, b) => a - b);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedTimetable]);

  const getEntryForPeriod = (day: string, period: number) => {
    return processedTimetable[day]?.find((entry) => entry.period === period) || null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {title && (
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-0 bg-gradient-to-r from-gray-50 to-gray-100 z-20 border-r border-gray-300 shadow-sm">
                Time / Period
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-5 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[220px] bg-gradient-to-r from-gray-50 to-gray-100"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold">{getDayName(day)}</span>
                    <span className="text-xs font-normal text-gray-500 mt-0.5">{day}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {allPeriods.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="text-gray-400 text-sm">No timetable entries configured</div>
                </td>
              </tr>
            ) : (
              allPeriods.map((period) => {
                const firstDayEntry = getEntryForPeriod(days[0], period);
                const isBreak = firstDayEntry?.isBreak || false;
                const timeDisplay = firstDayEntry
                  ? `${firstDayEntry.startTime} - ${firstDayEntry.endTime}`
                  : "";

                return (
                  <tr
                    key={period}
                    className={`${
                      isBreak
                        ? "bg-amber-50 hover:bg-amber-100"
                        : "hover:bg-gray-50 transition-colors"
                    }`}
                  >
                    <td
                      className={`px-5 py-4 whitespace-nowrap text-sm font-medium sticky left-0 z-10 border-r border-gray-200 ${
                        isBreak
                          ? "bg-amber-50 text-amber-800"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      {isBreak ? (
                        <div className="flex items-center space-x-2">
                          <FiCoffee className="text-amber-600" />
                          <div>
                            <div className="font-semibold text-amber-800">Break</div>
                            <div className="text-xs text-amber-600 font-medium">
                              {timeDisplay}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold">Period {Math.floor(period)}</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">
                            {timeDisplay}
                          </div>
                        </div>
                      )}
                    </td>
                    {days.map((day) => {
                      const entry = getEntryForPeriod(day, period);
                      const isBreakCell = entry?.isBreak || false;

                      return (
                        <td
                          key={`${day}-${period}`}
                          className={`px-4 py-3 text-sm border-r border-gray-100 ${
                            isBreakCell ? "bg-amber-50" : ""
                          }`}
                        >
                          {isBreakCell ? (
                            <div className="text-center py-2">
                              <div className="inline-flex items-center space-x-1 text-amber-700">
                                <FiCoffee className="text-amber-600" />
                                <span className="text-xs font-medium">Break</span>
                              </div>
                            </div>
                          ) : entry && entry.subject && entry.teacher ? (
                            <div className="group">
                              <div
                                className={`p-3.5 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                                  entry.substituteTeacher
                                    ? "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300"
                                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300"
                                }`}
                              >
                                <div className="space-y-2">
                                  <div className="flex items-start justify-between">
                                    <div className="font-bold text-gray-900 text-sm leading-tight">
                                      {entry.subject}
                                    </div>
                                    {entry.substituteTeacher && (
                                      <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-orange-200 text-orange-800 rounded-full">
                                        Sub
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center text-xs text-gray-700 font-medium">
                                    <FiUser className="mr-1.5 flex-shrink-0 text-gray-500" />
                                    <span className="truncate">
                                      {entry.substituteTeacher || entry.teacher}
                                    </span>
                                  </div>

                                  <div className="flex items-center text-xs text-gray-600">
                                    <FiClock className="mr-1.5 flex-shrink-0 text-gray-400" />
                                    <span>{entry.startTime} - {entry.endTime}</span>
                                  </div>

                                  {entry.room && (
                                    <div className="flex items-center text-xs text-gray-600">
                                      <FiMapPin className="mr-1.5 flex-shrink-0 text-gray-400" />
                                      <span>{entry.room}</span>
                                    </div>
                                  )}

                                  {entry.notes && (
                                    <div className="text-xs text-gray-500 italic mt-1.5 pt-1.5 border-t border-gray-200">
                                      {entry.notes}
                                    </div>
                                  )}

                                  {showActions && onEdit && onDelete && entry._id && (
                                    <div className="flex justify-end space-x-1 mt-2.5 pt-2.5 border-t border-gray-200">
                                      <EditButton 
                                        onClick={() => {
                                          if (onEdit) {
                                            onEdit({
                                              _id: entry._id!,
                                              class: "",
                                              day: day as "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat",
                                              period: entry.period,
                                              startTime: entry.startTime,
                                              endTime: entry.endTime,
                                              subject: entry.subject || "",
                                              teacher: entry.substituteTeacher || entry.teacher || "",
                                              room: entry.room,
                                              notes: entry.notes,
                                              isSubstitute: !!entry.substituteTeacher,
                                            });
                                          }
                                        }} 
                                      />
                                      <DeleteButton onClick={() => entry._id && onDelete && onDelete(entry._id)} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-gray-300 text-xs py-2">—</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyTimetableGrid;

