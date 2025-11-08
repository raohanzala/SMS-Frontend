import React, { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { ClassAttendanceTableProps } from "../types/attendance-components.types";
import { AttendanceStatus } from "../types/attendance.types";

const ClassAttendanceTable = ({
  students,
  classInfo,
  onStatusChange,
  onRemarksChange,
  onSave,
  isSaving = false,
  attendanceRecords,
}: ClassAttendanceTableProps) => {
  const [expandedRemarks, setExpandedRemarks] = useState<Record<string, boolean>>({});

  const statusConfig: Record<AttendanceStatus, { label: string; color: string; bgColor: string }> = {
    Present: { label: "P", color: "text-white", bgColor: "bg-green-500" },
    Absent: { label: "A", color: "text-white", bgColor: "bg-red-500" },
    Leave: { label: "L", color: "text-white", bgColor: "bg-yellow-500" },
    Late: { label: "LT", color: "text-white", bgColor: "bg-orange-500" },
    "Half Day": { label: "H", color: "text-white", bgColor: "bg-blue-500" },
  };

  const toggleRemarks = (studentId: string) => {
    setExpandedRemarks((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {classInfo && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">
            {classInfo.name} - {students.length} {students.length === 1 ? "Student" : "Students"}
          </h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll No
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const currentRecord = attendanceRecords[student._id] || {
                status: (student.attendance?.status as AttendanceStatus) || "Present",
                remarks: student.attendance?.remarks || "",
              };
              const isRemarksExpanded = expandedRemarks[student._id];

              return (
                <tr key={student._id} className="hover:bg-gray-50">
                  {/* Student Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={
                          student.profileImage ||
                          (student.name?.charAt(0).toLowerCase() === "f"
                            ? "/female-student-avatar.jpg"
                            : "/male-student-avatar.jpg")
                        }
                        alt={student.name}
                        className="h-10 w-10 rounded-full object-cover border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            student.name?.charAt(0).toLowerCase() === "f"
                              ? "/female-student-avatar.jpg"
                              : "/male-student-avatar.jpg";
                        }}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        {typeof student.class === "object" && student.class?.name && (
                          <div className="text-xs text-gray-500">
                            {student.class.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Roll No */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {student.rollNumber || "N/A"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {Object.entries(statusConfig).map(([status, config]) => {
                        const isActive = currentRecord.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => onStatusChange(student._id, status as AttendanceStatus)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full border text-sm font-bold transition-all duration-200 ${
                              isActive
                                ? `${config.bgColor} ${config.color} ring-2 ring-offset-1 scale-105`
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                            title={status}
                          >
                            {config.label}
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Remarks */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {isRemarksExpanded ? (
                        <Input
                          type="text"
                          value={currentRecord.remarks || ""}
                          onChange={(e) =>
                            onRemarksChange?.(student._id, e.target.value)
                          }
                          placeholder="Enter remarks (optional)"
                          className="flex-1"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          {currentRecord.remarks || "No remarks"}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleRemarks(student._id)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {isRemarksExpanded ? "Hide" : "Add"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
        <Button onClick={onSave} disabled={isSaving} loading={isSaving}>
          Save Attendance
        </Button>
      </div>
    </div>
  );
};

export default ClassAttendanceTable;

