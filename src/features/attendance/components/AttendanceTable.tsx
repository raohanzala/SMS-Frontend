import React from "react";
import { StudentWithAttendance, AttendanceStatus } from "../types/attendance.types";
import AttendanceStatusBadge from "./AttendanceStatusBadge";
import AttendanceStatusSelector from "./AttendanceStatusSelector";
import Input from "@/components/common/Input";
import Table from "@/components/common/Table";

interface AttendanceTableProps {
  students: StudentWithAttendance[];
  isFinalized: boolean;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onRemarksChange?: (studentId: string, remarks: string) => void;
  disabled?: boolean;
}

interface AttendanceTableRow extends StudentWithAttendance {
  _id: string;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onRemarksChange?: (studentId: string, remarks: string) => void;
  isFinalized: boolean;
  disabled: boolean;
}

const AttendanceTable = ({
  students,
  isFinalized,
  onStatusChange,
  onRemarksChange,
  disabled = false,
}: AttendanceTableProps) => {
  const attendanceColumns = [
    {
      key: "rollNumber",
      header: "Roll No.",
      render: (row: AttendanceTableRow) => (
        <span className="text-sm text-text-primary">
          {row.student.rollNumber || "-"}
        </span>
      ),
    },
    {
      key: "student",
      header: "Student Name",
      render: (row: AttendanceTableRow) => (
        <div className="flex items-center">
          {row.student.profileImage ? (
            <img
              className="h-10 w-10 rounded-full mr-3"
              src={row.student.profileImage}
              alt={row.student.name}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {row.student.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-text-primary">
            {row.student.name}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: AttendanceTableRow) => {
        const currentStatus = row.attendance?.status || "PRESENT";
        if (row.disabled || row.isFinalized) {
          return <AttendanceStatusBadge status={currentStatus} />;
        }
        return (
          <AttendanceStatusSelector
            currentStatus={currentStatus}
            onStatusChange={(status) => row.onStatusChange(row.student._id, status)}
            disabled={row.disabled || row.isFinalized}
          />
        );
      },
    },
    {
      key: "remarks",
      header: "Remarks",
      render: (row: AttendanceTableRow) => {
        if (row.disabled || row.isFinalized) {
          return (
            <span className="text-sm text-text-secondary">
              {row.attendance?.remarks || "-"}
            </span>
          );
        }
        return (
          <Input
            type="text"
            value={row.attendance?.remarks || ""}
            onChange={(e) =>
              row.onRemarksChange?.(row.student._id, e.target.value)
            }
            placeholder="Optional remarks"
          />
        );
      },
    },
  ];

  const attendanceTableData: AttendanceTableRow[] = students.map((item) => ({
    ...item,
    _id: item.student._id,
    onStatusChange,
    onRemarksChange,
    isFinalized,
    disabled,
  }));

  return (
    <Table
      title="Attendance"
      data={attendanceTableData}
      columns={attendanceColumns}
      selectable={false}
    />
  );
};

export default AttendanceTable;

