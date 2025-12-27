import React from "react";
import { TeacherWithAttendance } from "../types/teacherAttendance.types";
import TeacherAttendanceStatusBadge from "./TeacherAttendanceStatusBadge";
import TeacherAttendanceStatusSelector from "./TeacherAttendanceStatusSelector";
import Input from "@/components/common/Input";
import Table from "@/components/common/Table";
import EntitySelect from "@/components/common/EntitySelect";

type TeacherAttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE";

interface TeacherAttendanceTableProps {
  teachers: TeacherWithAttendance[];
  isFinalized: boolean;
  onStatusChange: (teacherId: string, status: TeacherAttendanceStatus) => void;
  onInTimeChange?: (teacherId: string, inTime: string) => void;
  onOutTimeChange?: (teacherId: string, outTime: string) => void;
  onSubstituteToggle?: (teacherId: string, assigned: boolean) => void;
  onSubstituteTeacherChange?: (teacherId: string, substituteTeacherId: string | null) => void;
  onRemarksChange?: (teacherId: string, remarks: string) => void;
  disabled?: boolean;
}

interface TeacherAttendanceTableRow extends TeacherWithAttendance {
  _id: string;
  onStatusChange: (teacherId: string, status: TeacherAttendanceStatus) => void;
  onInTimeChange?: (teacherId: string, inTime: string) => void;
  onOutTimeChange?: (teacherId: string, outTime: string) => void;
  onSubstituteToggle?: (teacherId: string, assigned: boolean) => void;
  onSubstituteTeacherChange?: (teacherId: string, substituteTeacherId: string | null) => void;
  onRemarksChange?: (teacherId: string, remarks: string) => void;
  isFinalized: boolean;
  disabled: boolean;
}

const TeacherAttendanceTable = ({
  teachers,
  isFinalized,
  onStatusChange,
  onInTimeChange,
  onOutTimeChange,
  onSubstituteToggle,
  onSubstituteTeacherChange,
  onRemarksChange,
  disabled = false,
}: TeacherAttendanceTableProps) => {
  const attendanceColumns = [
    {
      key: "teacher",
      header: "Teacher Name",
      render: (row: TeacherAttendanceTableRow) => (
        <div className="flex items-center gap-3">
          {row.teacher.profileImage ? (
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={row.teacher.profileImage}
              alt={row.teacher.name}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {row.teacher.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-text-primary">
            {row.teacher.name}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: TeacherAttendanceTableRow) => {
        const currentStatus = (row.attendance?.status || "PRESENT") as TeacherAttendanceStatus;
        if (row.disabled || row.isFinalized) {
          return <TeacherAttendanceStatusBadge status={currentStatus} />;
        }
        return (
          <TeacherAttendanceStatusSelector
            currentStatus={currentStatus}
            onStatusChange={(status) => row.onStatusChange(row.teacher._id, status)}
            disabled={row.disabled || row.isFinalized}
          />
        );
      },
    },
    {
      key: "inTime",
      header: "In Time",
      render: (row: TeacherAttendanceTableRow) => {
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
              row.onInTimeChange?.(row.teacher._id, e.target.value)
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
      render: (row: TeacherAttendanceTableRow) => {
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
              row.onOutTimeChange?.(row.teacher._id, e.target.value)
            }
            disabled={row.disabled || row.isFinalized}
            className="w-32"
          />
        );
      },
    },
    {
      key: "substitute",
      header: "Substitute",
      render: (row: TeacherAttendanceTableRow) => {
        const currentStatus = (row.attendance?.status || "PRESENT") as TeacherAttendanceStatus;
        const isAbsent = currentStatus === "ABSENT";
        const substituteAssigned = row.attendance?.substituteAssigned || false;

        if (row.disabled || row.isFinalized) {
          if (substituteAssigned && row.attendance?.substituteTeacher) {
            return (
              <span className="text-sm text-text-primary">
                {row.attendance.substituteTeacher.name}
              </span>
            );
          }
          return <span className="text-sm text-text-secondary">-</span>;
        }

        if (!isAbsent) {
          return <span className="text-sm text-text-secondary">-</span>;
        }

        return (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={substituteAssigned}
                onChange={(e) =>
                  row.onSubstituteToggle?.(row.teacher._id, e.target.checked)
                }
                disabled={row.disabled || row.isFinalized}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Assign</span>
            </label>
            {substituteAssigned && (
              <div className="flex-1 min-w-[200px]">
                <EntitySelect
                  entity="teacher"
                  value={row.attendance?.substituteTeacher?._id || null}
                  onChange={(value) => {
                    const teacherId = Array.isArray(value) ? value[0] || null : value;
                    row.onSubstituteTeacherChange?.(
                      row.teacher._id,
                      teacherId as string | null
                    );
                  }}
                  placeholder="Select substitute"
                  isDisabled={row.disabled || row.isFinalized}
                />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "remarks",
      header: "Remarks",
      render: (row: TeacherAttendanceTableRow) => {
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
              row.onRemarksChange?.(row.teacher._id, e.target.value)
            }
            placeholder="Optional remarks"
            disabled={row.disabled || row.isFinalized}
            className="w-48"
          />
        );
      },
    },
  ];

  const tableData = teachers.map((teacher) => ({
    ...teacher,
    _id: teacher.teacher._id,
    onStatusChange,
    onInTimeChange,
    onOutTimeChange,
    onSubstituteToggle,
    onSubstituteTeacherChange,
    onRemarksChange,
    isFinalized,
    disabled,
  }));

  return (
    <Table
      title={`Teacher Attendance (${teachers.length})`}
      data={tableData}
      columns={attendanceColumns}
      selectable={false}
    />
  );
};

export default TeacherAttendanceTable;

