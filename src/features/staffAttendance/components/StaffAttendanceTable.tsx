import React from "react";
import { StaffWithAttendance } from "../types/staffAttendance.types";
import StaffAttendanceStatusBadge from "./StaffAttendanceStatusBadge";
import StaffAttendanceStatusSelector from "./StaffAttendanceStatusSelector";
import Input from "@/components/common/Input";
import Table from "@/components/common/Table";

type StaffAttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE" | "HALF_DAY";

interface StaffAttendanceTableProps {
  staff: StaffWithAttendance[];
  isFinalized: boolean;
  onStatusChange: (staffId: string, status: StaffAttendanceStatus) => void;
  onInTimeChange?: (staffId: string, inTime: string) => void;
  onOutTimeChange?: (staffId: string, outTime: string) => void;
  onRemarksChange?: (staffId: string, remarks: string) => void;
  disabled?: boolean;
}

interface StaffAttendanceTableRow extends StaffWithAttendance {
  _id: string;
  onStatusChange: (staffId: string, status: StaffAttendanceStatus) => void;
  onInTimeChange?: (staffId: string, inTime: string) => void;
  onOutTimeChange?: (staffId: string, outTime: string) => void;
  onRemarksChange?: (staffId: string, remarks: string) => void;
  isFinalized: boolean;
  disabled: boolean;
}

const StaffAttendanceTable = ({
  staff,
  isFinalized,
  onStatusChange,
  onInTimeChange,
  onOutTimeChange,
  onRemarksChange,
  disabled = false,
}: StaffAttendanceTableProps) => {
  const attendanceColumns = [
    {
      key: "staff",
      header: "Staff Name",
      render: (row: StaffAttendanceTableRow) => (
        <div className="flex items-center gap-3">
          {row.staff.profileImage ? (
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={row.staff.profileImage}
              alt={row.staff.name}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {row.staff.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <span className="text-sm font-medium text-text-primary block">
              {row.staff.name}
            </span>
            {row.staff.designation && (
              <span className="text-xs text-text-secondary">
                {row.staff.designation}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: StaffAttendanceTableRow) => {
        const currentStatus = (row.attendance?.status || "PRESENT") as StaffAttendanceStatus;
        if (row.disabled || row.isFinalized) {
          return <StaffAttendanceStatusBadge status={currentStatus} />;
        }
        return (
          <StaffAttendanceStatusSelector
            currentStatus={currentStatus}
            onStatusChange={(status) => row.onStatusChange(row.staff._id, status)}
            disabled={row.disabled || row.isFinalized}
          />
        );
      },
    },
    {
      key: "inTime",
      header: "In Time",
      render: (row: StaffAttendanceTableRow) => {
        if (row.disabled || row.isFinalized) {
          return (
            <span className="text-sm text-text-secondary">
              {row.attendance?.inTime || "-"}
            </span>
          );
        }
        return (
          <Input
            type="time"
            value={row.attendance?.inTime || ""}
            onChange={(e) =>
              row.onInTimeChange?.(row.staff._id, e.target.value)
            }
            disabled={row.disabled || row.isFinalized}
            className="w-32"
          />
        );
      },
    },
    {
      key: "outTime",
      header: "Out Time",
      render: (row: StaffAttendanceTableRow) => {
        if (row.disabled || row.isFinalized) {
          return (
            <span className="text-sm text-text-secondary">
              {row.attendance?.outTime || "-"}
            </span>
          );
        }
        return (
          <Input
            type="time"
            value={row.attendance?.outTime || ""}
            onChange={(e) =>
              row.onOutTimeChange?.(row.staff._id, e.target.value)
            }
            disabled={row.disabled || row.isFinalized}
            className="w-32"
          />
        );
      },
    },
    {
      key: "remarks",
      header: "Remarks",
      render: (row: StaffAttendanceTableRow) => {
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
              row.onRemarksChange?.(row.staff._id, e.target.value)
            }
            placeholder="Optional remarks"
            disabled={row.disabled || row.isFinalized}
            className="w-48"
          />
        );
      },
    },
  ];

  const tableData = staff.map((item) => ({
    ...item,
    _id: item.staff._id,
    onStatusChange,
    onInTimeChange,
    onOutTimeChange,
    onRemarksChange,
    isFinalized,
    disabled,
  }));

  return (
    <Table
      title={`Staff Attendance (${staff.length})`}
      data={tableData}
      columns={attendanceColumns}
      selectable={false}
    />
  );
};

export default StaffAttendanceTable;

