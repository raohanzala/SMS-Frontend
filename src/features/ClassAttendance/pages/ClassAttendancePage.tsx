import { useCallback, useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import ClassAttendanceTable from "../components/ClassAttendanceTable";
import ClassAttendanceToolbar from "../components/ClassAttendanceToolbar";
import { useStudentsByClass } from "../hooks/useStudentsByClass";
import { useMarkAttendance } from "../hooks/useMarkAttendance";
import { AttendanceStatus } from "../types/attendance.types";

const ClassAttendancePage = () => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, { status: AttendanceStatus; remarks?: string }>
  >({});

  const { studentsData, isStudentsLoading, studentsError, refetch } = useStudentsByClass(
    selectedClassId,
    selectedDate
  );
  const { markAttendanceMutation, isMarkingAttendance } = useMarkAttendance();

  const handleFilterChange = useCallback((classId: string, date: string) => {
    setSelectedClassId(classId);
    setSelectedDate(date);
  }, []);

  const handleStatusChange = useCallback((studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  }, []);

  const handleRemarksChange = useCallback((studentId: string, remarks: string) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedClassId || !selectedDate || !studentsData) {
      return;
    }

    // Build attendance records array
    const attendance = studentsData.students.map((student) => {
      const record = attendanceRecords[student._id] || {
        status: (student.attendance?.status as AttendanceStatus) || "Present",
        remarks: student.attendance?.remarks || "",
      };

      return {
        user: student._id,
        status: record.status,
        userModel: "Student" as const,
        remarks: record.remarks || undefined,
      };
    });

    markAttendanceMutation(
      {
        date: selectedDate,
        attendance,
        classId: selectedClassId,
      },
      {
        onSuccess: () => {
          // Refetch students to get updated attendance
          refetch();
          // Optionally show success message
        },
      }
    );
  }, [selectedClassId, selectedDate, studentsData, attendanceRecords, markAttendanceMutation, refetch]);

  // Initialize attendance records when students are loaded
  useEffect(() => {
    if (studentsData?.students) {
      const initialRecords: Record<string, { status: AttendanceStatus; remarks?: string }> = {};
      studentsData.students.forEach((student) => {
        if (student.attendance) {
          initialRecords[student._id] = {
            status: student.attendance.status as AttendanceStatus,
            remarks: student.attendance.remarks,
          };
        } else {
          initialRecords[student._id] = {
            status: "Present",
            remarks: "",
          };
        }
      });
      setAttendanceRecords(initialRecords);
    }
  }, [studentsData]);

  return (
    <div className="space-y-6">
      <ClassAttendanceToolbar
        onFilterChange={handleFilterChange}
        selectedClassId={selectedClassId || undefined}
        selectedDate={selectedDate || undefined}
      />

      {isStudentsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {studentsError && (
        <ErrorMessage
          message={studentsError.message || "Failed to load students"}
          onRetry={() => refetch()}
        />
      )}

      {!isStudentsLoading && !studentsError && selectedClassId && selectedDate && (
        <>
          {!studentsData || studentsData.students.length === 0 ? (
            <EmptyState
              icon={FiUsers}
              title="No Students Found"
              description={`No students found for the selected class and date.`}
            />
          ) : (
            <ClassAttendanceTable
              students={studentsData.students}
              classInfo={studentsData.class}
              onStatusChange={handleStatusChange}
              onRemarksChange={handleRemarksChange}
              onSave={handleSave}
              isSaving={isMarkingAttendance}
              attendanceRecords={attendanceRecords}
            />
          )}
        </>
      )}

      {!selectedClassId || !selectedDate ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a class and date to view and mark attendance.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ClassAttendancePage;

