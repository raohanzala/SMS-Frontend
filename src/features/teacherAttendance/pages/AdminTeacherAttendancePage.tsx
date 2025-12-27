import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetTeacherAttendance } from "../hooks/useGetTeacherAttendance";
import { useMarkTeacherAttendance } from "../hooks/useMarkTeacherAttendance";
import { useUpdateTeacherAttendance } from "../hooks/useUpdateTeacherAttendance";
import { useFinalizeTeacherAttendance } from "../hooks/useFinalizeTeacherAttendance";
import { useReopenTeacherAttendance } from "../hooks/useReopenTeacherAttendance";
import DateFilter from "../components/DateFilter";
import TeacherAttendanceTable from "../components/TeacherAttendanceTable";
import TeacherAttendanceActions from "../components/TeacherAttendanceActions";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  TeacherWithAttendance,
  MarkTeacherAttendanceInput,
  UpdateTeacherAttendanceInput,
} from "../types/teacherAttendance.types";
import { useAllSessions } from "@/features/students/hooks/useAllSessions";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { Calendar } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import { Session } from "@/features/sessions/types/session.types";
import Spinner from "@/components/common/Spinner";

type TeacherAttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE";

const AdminTeacherAttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [localTeachers, setLocalTeachers] = useState<TeacherWithAttendance[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const { sessions } = useAllSessions();

  const activeSession = useMemo(() => {
    if (sessions && sessions.length > 0) {
      const active = sessions.find((s: Session) => s?.isActive);
      return active || sessions[0];
    }
    return null;
  }, [sessions]);

  // Set default session on mount
  useMemo(() => {
    if (activeSession && !selectedSessionId) {
      setSelectedSessionId(activeSession._id);
    }
  }, [activeSession, selectedSessionId]);

  const { attendance, attendanceError, teachers, statistics, isFinalized, isAttendanceLoading } = useGetTeacherAttendance(
    selectedDate
  );

  const { markAttendanceMutation, isMarkingAttendance } = useMarkTeacherAttendance();
  const { updateAttendanceMutation, isUpdatingAttendance } = useUpdateTeacherAttendance();
  const { finalizeAttendanceMutation, isFinalizingAttendance } = useFinalizeTeacherAttendance();
  const { reopenAttendanceMutation, isReopeningAttendance } = useReopenTeacherAttendance();

  // Update local teachers when attendance data changes
  useMemo(() => {
    if (attendance?.teachers) {
      setLocalTeachers(attendance.teachers);
    }
  }, [attendance]);

  const handleStatusChange = (teacherId: string, status: TeacherAttendanceStatus) => {
    setLocalTeachers((prev) =>
      prev.map((t) =>
        t.teacher._id === teacherId
          ? {
              ...t,
              attendance: t.attendance
                ? {
                    ...t.attendance,
                    status,
                    // Clear substitute if status is not ABSENT
                    substituteAssigned: status === "ABSENT" ? t.attendance.substituteAssigned : false,
                    substituteTeacher: status === "ABSENT" ? t.attendance.substituteTeacher : null,
                  }
                : {
                    status,
                    inTime: null,
                    outTime: null,
                    substituteAssigned: false,
                    substituteTeacher: null,
                    remarks: "",
                  },
            }
          : t
      )
    );
  };

  const handleInTimeChange = (teacherId: string, inTime: string) => {
    setLocalTeachers((prev) =>
      prev.map((t) =>
        t.teacher._id === teacherId
          ? {
              ...t,
              attendance: t.attendance
                ? { ...t.attendance, inTime }
                : {
                    status: "PRESENT",
                    inTime,
                    outTime: null,
                    substituteAssigned: false,
                    substituteTeacher: null,
                    remarks: "",
                  },
            }
          : t
      )
    );
  };

  const handleOutTimeChange = (teacherId: string, outTime: string) => {
    setLocalTeachers((prev) =>
      prev.map((t) =>
        t.teacher._id === teacherId
          ? {
              ...t,
              attendance: t.attendance
                ? { ...t.attendance, outTime }
                : {
                    status: "PRESENT",
                    inTime: null,
                    outTime,
                    substituteAssigned: false,
                    substituteTeacher: null,
                    remarks: "",
                  },
            }
          : t
      )
    );
  };

  const handleSubstituteToggle = (teacherId: string, assigned: boolean) => {
    setLocalTeachers((prev) =>
      prev.map((t) =>
        t.teacher._id === teacherId
          ? {
              ...t,
              attendance: t.attendance
                ? {
                    ...t.attendance,
                    substituteAssigned: assigned,
                    substituteTeacher: assigned ? t.attendance.substituteTeacher : null,
                  }
                : {
                    status: "ABSENT",
                    inTime: null,
                    outTime: null,
                    substituteAssigned: assigned,
                    substituteTeacher: null,
                    remarks: "",
                  },
            }
          : t
      )
    );
  };

  const handleSubstituteTeacherChange = (teacherId: string, substituteTeacherId: string | null) => {
    setLocalTeachers((prev) =>
      prev.map((t) => {
        if (t.teacher._id === teacherId) {
          // Find the substitute teacher
          const substituteTeacher = prev.find((tt) => tt.teacher._id === substituteTeacherId);
          return {
            ...t,
            attendance: t.attendance
              ? {
                  ...t.attendance,
                  substituteTeacherId: substituteTeacherId,
                  substituteTeacher: substituteTeacher
                    ? {
                        _id: substituteTeacher.teacher._id,
                        name: substituteTeacher.teacher.name,
                        profileImage: substituteTeacher.teacher.profileImage,
                      }
                    : null,
                }
              : {
                  status: "ABSENT",
                  inTime: null,
                  outTime: null,
                  substituteAssigned: true,
                  substituteTeacherId: substituteTeacherId,
                  substituteTeacher: substituteTeacher
                    ? {
                        _id: substituteTeacher.teacher._id,
                        name: substituteTeacher.teacher.name,
                        profileImage: substituteTeacher.teacher.profileImage,
                      }
                    : null,
                  remarks: "",
                },
          };
        }
        return t;
      })
    );
  };

  const handleRemarksChange = (teacherId: string, remarks: string) => {
    setLocalTeachers((prev) =>
      prev.map((t) =>
        t.teacher._id === teacherId
          ? {
              ...t,
              attendance: t.attendance
                ? { ...t.attendance, remarks }
                : {
                    status: "PRESENT",
                    inTime: null,
                    outTime: null,
                    substituteAssigned: false,
                    substituteTeacher: null,
                    remarks,
                  },
            }
          : t
      )
    );
  };

  const handleSave = () => {
    if (!selectedDate || !selectedSessionId || localTeachers.length === 0) {
      return;
    }

    const records = localTeachers.map((item) => {
      const status = (item.attendance?.status || "PRESENT") as TeacherAttendanceStatus;
      return {
        teacherId: item.teacher._id,
        status,
        inTime: item.attendance?.inTime || null,
        outTime: item.attendance?.outTime || null,
        substituteAssigned: status === "ABSENT" ? (item.attendance?.substituteAssigned || false) : false,
        substituteTeacherId:
          status === "ABSENT" && item.attendance?.substituteAssigned
            ? item.attendance?.substituteTeacher?._id || null
            : null,
        remarks: item.attendance?.remarks || "",
      };
    });

    if (attendance?._id) {
      // Update existing attendance
      const updatePayload: UpdateTeacherAttendanceInput = { records };
      updateAttendanceMutation({
        attendanceId: attendance._id,
        payload: updatePayload,
      });
    } else {
      // Create new attendance
      const markPayload: MarkTeacherAttendanceInput = {
        sessionId: selectedSessionId,
        date: selectedDate,
        records,
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

  // Check permissions
  const canFinalize = user?.role === "school_owner" || user?.role === "admin";
  const canReopen = user?.role === "school_owner" || user?.role === "admin";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Teacher Attendance</h1>
          <p className="text-sm text-text-secondary mt-1">
            Mark and manage teacher attendance
          </p>
        </div>
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
              value={selectedSessionId}
              onChange={(value) =>
                setSelectedSessionId(Array.isArray(value) ? value[0] || null : value)
              }
              placeholder="Select session"
            />
          </FormRowVertical>
        </div>
      )}

      <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {attendanceError ? (
        <ErrorMessage message={attendanceError.message || "Failed to load teacher attendance"} />
      ) : selectedDate ? (
        <>
					{isAttendanceLoading ? (
						<Spinner />
					) : (
						
					<TeacherAttendanceTable
            teachers={localTeachers}
            isFinalized={isFinalized}
            onStatusChange={handleStatusChange}
            onInTimeChange={handleInTimeChange}
            onOutTimeChange={handleOutTimeChange}
            onSubstituteToggle={handleSubstituteToggle}
            onSubstituteTeacherChange={handleSubstituteTeacherChange}
            onRemarksChange={handleRemarksChange}
            disabled={isFinalized}
          />
					)}
          

          {isFinalized && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                🔒 This attendance has been finalized by admin and cannot be edited.
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <TeacherAttendanceActions
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
      ) : (
				<EmptyState icon={Calendar} title="Please select a date to view teacher attendance" description="Please select a date to view teacher attendance" />
      )}
    </div>
  );
};

export default AdminTeacherAttendancePage;

