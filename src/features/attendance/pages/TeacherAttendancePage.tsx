import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAttendance } from "../hooks/useGetAttendance";
import { useMarkAttendance } from "../hooks/useMarkAttendance";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";
import ClassDateFilter from "../components/ClassDateFilter";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceActions from "../components/AttendanceActions";
import AttendanceFinalizationBadge from "../components/AttendanceFinalizationBadge";
import AttendanceStatisticsBar from "../components/AttendanceStatisticsBar";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { AttendanceStatus, MarkAttendanceInput, UpdateAttendanceInput, StudentWithAttendance } from "../types/attendance.types";

const TeacherAttendancePage = () => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [localStudents, setLocalStudents] = useState<StudentWithAttendance[]>([]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});

  const user = useSelector((state: RootState) => state.auth.user);

  const { attendance, isAttendanceLoading, attendanceError } = useGetAttendance(
    selectedClassId,
    selectedDate
  );

  const { markAttendanceMutation, isMarkingAttendance } = useMarkAttendance();
  const { updateAttendanceMutation, isUpdatingAttendance } = useUpdateAttendance();

  // Update local students when attendance data changes
  useMemo(() => {
    if (attendance?.students) {
      setLocalStudents(attendance.students);
      // Initialize remarks
      const remarksMap: Record<string, string> = {};
      attendance.students.forEach((item) => {
        if (item.attendance?.remarks) {
          remarksMap[item.student._id] = item.attendance.remarks;
        }
      });
      setRemarks(remarksMap);
    }
  }, [attendance]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setLocalStudents((prev) =>
      prev.map((s) =>
        s.student._id === studentId
          ? {
              ...s,
              attendance: s.attendance
                ? {
                    ...s.attendance,
                    status,
                  }
                : {
                    status,
                    remarks: "",
                  },
            }
          : s
      )
    );
  };

  const handleRemarksChange = (studentId: string, remarksText: string) => {
    setRemarks((prev) => ({
      ...prev,
      [studentId]: remarksText,
    }));
  };

  const handleSave = () => {
    if (!selectedClassId || !selectedDate || localStudents.length === 0) {
      return;
    }

    const records = localStudents.map((item) => ({
      studentId: item.student._id,
      status: (item.attendance?.status || "PRESENT") as AttendanceStatus,
      remarks: remarks[item.student._id] || "",
    }));

    if (attendance?._id) {
      // Update existing attendance (only if not finalized)
      if (attendance.isFinalized) {
        return; // Should not happen, but safety check
      }
      const updatePayload: UpdateAttendanceInput = { records };
      updateAttendanceMutation({
        attendanceId: attendance._id,
        payload: updatePayload,
      });
    } else {
      // Create new attendance
      const markPayload: MarkAttendanceInput = {
        classId: selectedClassId,
        date: selectedDate,
        records,
      };
      markAttendanceMutation(markPayload);
    }
  };

  // Teachers cannot finalize or reopen
  const canFinalize = false;
  const canReopen = false;

  if (isAttendanceLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Class Attendance</h1>
        {attendance && (
          <AttendanceFinalizationBadge isFinalized={attendance.isFinalized} />
        )}
      </div>

      <ClassDateFilter
        selectedClassId={selectedClassId}
        selectedDate={selectedDate}
        onClassChange={setSelectedClassId}
        onDateChange={setSelectedDate}
      />

        {attendanceError ? (
          <ErrorMessage message={attendanceError.message || "Failed to load attendance"} />
        ) : selectedClassId && selectedDate ? (
          <>
            {attendance && <AttendanceStatisticsBar statistics={attendance.statistics} />}

            <AttendanceTable
              students={localStudents}
              isFinalized={attendance?.isFinalized || false}
              onStatusChange={handleStatusChange}
              onRemarksChange={handleRemarksChange}
              disabled={attendance?.isFinalized || false}
            />

            {attendance?.isFinalized && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  🔒 This attendance has been finalized by admin and cannot be edited.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <AttendanceActions
                isFinalized={attendance?.isFinalized || false}
                attendanceId={attendance?._id || null}
                canFinalize={canFinalize}
                canReopen={canReopen}
                onSave={handleSave}
                onFinalize={() => {}}
                onReopen={() => {}}
                isSaving={isMarkingAttendance || isUpdatingAttendance}
                isFinalizing={false}
                isReopening={false}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-text-secondary">
            Please select a class and date to view attendance
          </div>
        )}
    </div>
  );
};

export default TeacherAttendancePage;

