import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetStaffAttendance } from "../hooks/useGetStaffAttendance";
import { useMarkStaffAttendance } from "../hooks/useMarkStaffAttendance";
import { useUpdateStaffAttendance } from "../hooks/useUpdateStaffAttendance";
import { useFinalizeStaffAttendance } from "../hooks/useFinalizeStaffAttendance";
import { useReopenStaffAttendance } from "../hooks/useReopenStaffAttendance";
import CampusDateFilter from "../components/CampusDateFilter";
import StaffAttendanceTable from "../components/StaffAttendanceTable";
import StaffAttendanceActions from "../components/StaffAttendanceActions";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  StaffWithAttendance,
  MarkStaffAttendanceInput,
  UpdateStaffAttendanceInput,
} from "../types/staffAttendance.types";
import EmptyState from "@/components/common/EmptyState";
import { Calendar } from "lucide-react";
import Spinner from "@/components/common/Spinner";

type StaffAttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE" | "HALF_DAY";

const AdminStaffAttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [selectedCampusId, setSelectedCampusId] = useState<string | null>(null);
  const [localStaff, setLocalStaff] = useState<StaffWithAttendance[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const { campus: currentCampus } = useSelector((state: RootState) => state.auth);

  // Set default campus to current campus
  useMemo(() => {
    if (currentCampus?._id && !selectedCampusId) {
      setSelectedCampusId(currentCampus._id);
    }
  }, [currentCampus, selectedCampusId]);

  const { attendance, attendanceError, staff, statistics, isFinalized, isAttendanceLoading } = useGetStaffAttendance(
    selectedDate,
    selectedCampusId
  );

  const { markAttendanceMutation, isMarkingAttendance } = useMarkStaffAttendance();
  const { updateAttendanceMutation, isUpdatingAttendance } = useUpdateStaffAttendance();
  const { finalizeAttendanceMutation, isFinalizingAttendance } = useFinalizeStaffAttendance();
  const { reopenAttendanceMutation, isReopeningAttendance } = useReopenStaffAttendance();

  // Update local staff when attendance data changes
  useMemo(() => {
    if (staff && staff.length > 0) {
      setLocalStaff(staff);
    }
  }, [staff]);

  const handleStatusChange = (staffId: string, status: StaffAttendanceStatus) => {
    setLocalStaff((prev) =>
      prev.map((s) =>
        s.staff._id === staffId
          ? {
              ...s,
              attendance: s.attendance
                ? {
                    ...s.attendance,
                    status,
                  }
                : {
                    status,
                    inTime: null,
                    outTime: null,
                    remarks: "",
                  },
            }
          : s
      )
    );
  };

  const handleInTimeChange = (staffId: string, inTime: string) => {
    setLocalStaff((prev) =>
      prev.map((s) =>
        s.staff._id === staffId
          ? {
              ...s,
              attendance: s.attendance
                ? { ...s.attendance, inTime }
                : {
                    status: "PRESENT",
                    inTime,
                    outTime: null,
                    remarks: "",
                  },
            }
          : s
      )
    );
  };

  const handleOutTimeChange = (staffId: string, outTime: string) => {
    setLocalStaff((prev) =>
      prev.map((s) =>
        s.staff._id === staffId
          ? {
              ...s,
              attendance: s.attendance
                ? { ...s.attendance, outTime }
                : {
                    status: "PRESENT",
                    inTime: null,
                    outTime,
                    remarks: "",
                  },
            }
          : s
      )
    );
  };

  const handleRemarksChange = (staffId: string, remarks: string) => {
    setLocalStaff((prev) =>
      prev.map((s) =>
        s.staff._id === staffId
          ? {
              ...s,
              attendance: s.attendance
                ? { ...s.attendance, remarks }
                : {
                    status: "PRESENT",
                    inTime: null,
                    outTime: null,
                    remarks,
                  },
            }
          : s
      )
    );
  };

  const handleSave = () => {
    if (!selectedDate || !selectedCampusId || localStaff.length === 0) {
      return;
    }

    const records = localStaff.map((item) => {
      const status = (item.attendance?.status || "PRESENT") as StaffAttendanceStatus;
      return {
        staffId: item.staff._id,
        status,
        inTime: item.attendance?.inTime || null,
        outTime: item.attendance?.outTime || null,
        remarks: item.attendance?.remarks || "",
      };
    });

    if (attendance?._id) {
      // Update existing attendance
      const updatePayload: UpdateStaffAttendanceInput = { records };
      updateAttendanceMutation({
        attendanceId: attendance._id,
        payload: updatePayload,
      });
    } else {
      // Create new attendance
      const markPayload: MarkStaffAttendanceInput = {
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
          <h1 className="text-2xl font-bold text-text-primary">Staff Attendance</h1>
          <p className="text-sm text-text-secondary mt-1">
            Mark and manage staff attendance (Payroll-based)
          </p>
        </div>
      </div>

      <CampusDateFilter
        selectedCampusId={selectedCampusId}
        selectedDate={selectedDate}
        onCampusChange={setSelectedCampusId}
        onDateChange={setSelectedDate}
      />

      {attendanceError ? (
        <ErrorMessage message={attendanceError.message || "Failed to load staff attendance"} />
      ) : selectedDate && selectedCampusId ? (
        <>
          {isAttendanceLoading ? (
            <Spinner />
          ) : (
            <StaffAttendanceTable
              staff={localStaff}
              isFinalized={isFinalized}
              onStatusChange={handleStatusChange}
              onInTimeChange={handleInTimeChange}
              onOutTimeChange={handleOutTimeChange}
              onRemarksChange={handleRemarksChange}
              disabled={isFinalized}
            />
          )}

          {isFinalized && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                🔒 This attendance has been finalized by admin. Payroll data is locked.
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <StaffAttendanceActions
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
        <EmptyState
          icon={Calendar}
          title="Please select campus and date"
          description="Please select a campus and date to view staff attendance"
        />
      )}
    </div>
  );
};

export default AdminStaffAttendancePage;

