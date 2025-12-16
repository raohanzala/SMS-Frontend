import React from "react";
import Table from "@/components/common/Table";
import EditButton from "@/components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";
import { TimetableTableProps } from "../types/timetable-components.types";
import { Timetable } from "../types/timetable.types";

const TimetableTable = React.memo(
  ({
    timetables,
    onEditTimetable,
    onDeleteTimetable,
    selectedTimetables,
    onToggleSelect,
    onSelectAll,
    onDeselectAll,
  }: TimetableTableProps) => {
    const timetableColumns = [
      {
        key: "class",
        header: "Class",
        render: (row: Timetable & { _id: string }) => {
          const className =
            typeof row.class === "object" ? (row.class as { name?: string })?.name : "—";
    return (
            <span className="text-sm font-medium text-gray-900">{className}</span>
          );
        },
      },
      {
        key: "day",
        header: "Day",
        render: (row: Timetable & { _id: string }) => {
          // Convert short day names to full names for display
          const dayMap: Record<string, string> = {
            Mon: "Monday",
            Tue: "Tuesday",
            Wed: "Wednesday",
            Thu: "Thursday",
            Fri: "Friday",
            Sat: "Saturday",
          };
          const displayDay = dayMap[row.day] || row.day;
          return <span className="text-sm text-gray-500">{displayDay}</span>;
        },
      },
      {
        key: "period",
        header: "Period",
        render: (row: Timetable & { _id: string }) => (
          <span className="text-sm text-gray-500">{row.period}</span>
        ),
      },
      {
        key: "time",
        header: "Time",
        render: (row: Timetable & { _id: string }) => (
          <span className="text-sm text-gray-500">
            {row.startTime} - {row.endTime}
          </span>
        ),
      },
      {
        key: "subject",
        header: "Subject",
        render: (row: Timetable & { _id: string }) => (
          <span className="text-sm text-gray-500">{row.subject}</span>
        ),
      },
      {
        key: "teacher",
        header: "Teacher",
        render: (row: Timetable & { _id: string }) => {
                const teacherName =
            typeof row.teacher === "object"
              ? (row.teacher as { name?: string })?.name
                    : "—";
                return (
            <div className="text-sm text-gray-500">
                      {teacherName}
              {row.isSubstitute && (
                        <span className="ml-2 text-xs text-orange-600 font-medium">
                          (Substitute)
                        </span>
                      )}
            </div>
          );
        },
      },
      {
        key: "room",
        header: "Room",
        render: (row: Timetable & { _id: string }) => (
          <span className="text-sm text-gray-500">{row.room || "—"}</span>
        ),
      },
      {
        key: "type",
        header: "Type",
        render: (row: Timetable & { _id: string }) =>
          row.isSubstitute ? (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
              Substitute
            </span>
          ) : (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Regular
            </span>
          ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (
          row: Timetable & {
            _id: string;
            onEditTimetable: (row: Timetable) => void;
            onDeleteTimetable: (id: string) => void;
          }
        ) => (
          <div className="flex justify-end space-x-2">
            <EditButton onClick={() => row?.onEditTimetable?.(row)} />
            <DeleteButton
              onClick={() => row?.onDeleteTimetable?.(row._id)}
            />
          </div>
        ),
        width: "150px",
      },
    ];

    const timetablesTableData = timetables
      .filter((item) => item._id) // Filter out items without _id
      .map((item) => ({
        ...item,
        _id: item._id as string, // Ensure _id is string
        onEditTimetable,
        onDeleteTimetable,
      }));

    return (
      <Table
        title="Timetable Entries"
        data={timetablesTableData}
        columns={timetableColumns}
        selectable={true}
        selectedRows={selectedTimetables}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
      />
    );
  }
);

TimetableTable.displayName = "TimetableTable";

export default TimetableTable;

