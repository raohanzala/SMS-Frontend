import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAttendance } from "../hooks/useGetAttendance";
import { useMarkAttendance } from "../hooks/useMarkAttendance";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";
import { useFinalizeAttendance } from "../hooks/useFinalizeAttendance";
import { useReopenAttendance } from "../hooks/useReopenAttendance";
import ClassDateFilter from "../components/ClassDateFilter";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceActions from "../components/AttendanceActions";
import AttendanceStatisticsBar from "../components/AttendanceStatisticsBar";
import ErrorMessage from "@/components/common/ErrorMessage";
import { AttendanceStatus, MarkAttendanceInput, UpdateAttendanceInput, StudentWithAttendance } from "../types/attendance.types";
import EmptyState from "@/components/common/EmptyState";
import { FiCalendar } from "react-icons/fi";
import AttendanceFinalizationBadge from "../components/AttendanceFinalizationBadge";
import Spinner from "@/components/common/Spinner";
import { useAllSessions } from "@/features/students/hooks/useAllSessions";
import { Session } from "@/features/sessions/types/session.types";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { Calendar } from "lucide-react";
import EntitySelect from "@/components/common/EntitySelect";

const AdminClassAttendancePage = () => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [localStudents, setLocalStudents] = useState<StudentWithAttendance[]>([]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});

  const { sessions, activeSession } = useAllSessions();

  // const activeSession = useMemo(() => {
  //   if (sessions && sessions.length > 0) {
  //     const active = sessions.find((s: Session) => s?.isActive);
  //     return active || sessions[0];
  //   }
  //   return null;
  // }, [sessions]);

  // Set default session on mount
  useMemo(() => {
    if (activeSession && !selectedSessionId) {
      setSelectedSessionId(activeSession._id);
      console.log("selectedSessionId", selectedSessionId);
      console.log("activeSession", activeSession);
    }
  }, [activeSession, selectedSessionId]);

  const user = useSelector((state: RootState) => state.auth.user);

  const { attendance, students, statistics, isFinalized, isAttendanceLoading, attendanceError } = useGetAttendance(
    selectedClassId,
    selectedDate,
  );

  const { markAttendanceMutation, isMarkingAttendance } = useMarkAttendance();
  const { updateAttendanceMutation, isUpdatingAttendance } = useUpdateAttendance();
  const { finalizeAttendanceMutation, isFinalizingAttendance } = useFinalizeAttendance();
  const { reopenAttendanceMutation, isReopeningAttendance } = useReopenAttendance();

  // Update local students when attendance data changes
  useMemo(() => {
    if (attendance?.students) {
      setLocalStudents(attendance.students);
      // Initialize remarks
      const remarksMap: Record<string, string> = {};
      attendance.students.forEach((item) => {
        if (item.attendance?.remarks) {
          remarksMap[item.student._id] = item.attendance?.remarks || "";
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
      // Update existing attendance
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
        sessionId: selectedSessionId,
      };
      markAttendanceMutation(markPayload);
    }
  };

  const handleFinalize = () => {
    if (attendance?._id) {
      finalizeAttendanceMutation(attendance._id);
    }
  };

  const handleReopen = () => {
    if (attendance?._id) {
      reopenAttendanceMutation(attendance._id);
    }
  };

  const canFinalize = user?.role === "admin" || user?.role === "school_owner";
  const canReopen = user?.role === "admin" || user?.role === "school_owner";

  // if (isAttendanceLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-2xl font-bold text-text-primary">Class Attendance</h1> */}
        {attendance && (
          <AttendanceFinalizationBadge isFinalized={attendance.isFinalized} />
        )}
      </div>

      {/* Session Selector */}
      {sessions && sessions.length > 0 && (
        <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
          <FormRowVertical  
            label="Session"
            name="session"
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="session"
              value={activeSession?._id}
              onChange={(value) =>
                setSelectedSessionId(value as string)
              }
              placeholder="Select session"
            />
          </FormRowVertical>
        </div>
      )}

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
            {isAttendanceLoading ? (
              <Spinner />
            ) : (
              
           <>
            {attendance && <AttendanceStatisticsBar statistics={statistics} />}

            <AttendanceTable
              students={localStudents}
              isFinalized={isFinalized}
              onStatusChange={handleStatusChange}
              onRemarksChange={handleRemarksChange}
              disabled={false}
            />

            <div className="mt-6 flex justify-end">
              <AttendanceActions
                isFinalized={isFinalized}
                attendanceId={attendance?._id || null}
                canFinalize={canFinalize}
                canReopen={canReopen}
                onSave={handleSave}
                onFinalize={handleFinalize}
                onReopen={handleReopen}
                isSaving={isMarkingAttendance || isUpdatingAttendance}
                isFinalizing={isFinalizingAttendance}
                isReopening={isReopeningAttendance}
              />
            </div>
            </>
             )}

          </>
        ) : (
          <EmptyState
            icon={FiCalendar}
            title="No attendance found"
            description="Please select a class and date to view attendance"
          />
        )}
    </div>
  );
};

export default AdminClassAttendancePage;

