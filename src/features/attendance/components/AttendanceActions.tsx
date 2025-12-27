import Button from "@/components/common/Button";
import { Lock, Unlock, Save, CheckCircle } from "lucide-react";

interface AttendanceActionsProps {
  isFinalized: boolean;
  attendanceId: string | null;
  canFinalize: boolean;
  canReopen: boolean;
  onSave: () => void;
  onFinalize: () => void;
  onReopen: () => void;
  isSaving?: boolean;
  isFinalizing?: boolean;
  isReopening?: boolean;
}

const AttendanceActions = ({
  isFinalized,
  attendanceId,
  canFinalize,
  canReopen,
  onSave,
  onFinalize,
  onReopen,
  isSaving = false,
  isFinalizing = false,
  isReopening = false,
}: AttendanceActionsProps) => {
  if (isFinalized) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Lock className="h-4 w-4" />
          <span>Attendance finalized by admin</span>
        </div>
        {canReopen && (
          <Button
            variant="outline"
            onClick={onReopen}
            loading={isReopening}
            startIcon={<Unlock className="h-4 w-4" />}
          >
            Reopen Attendance
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="primary"
        onClick={onSave}
        loading={isSaving}
        startIcon={<Save className="h-4 w-4" />}
      >
        {attendanceId ? "Update Attendance" : "Save Attendance"}
      </Button>
      {canFinalize && attendanceId && (
        <Button
          variant="success"
          onClick={onFinalize}
          loading={isFinalizing}
          startIcon={<CheckCircle className="h-4 w-4" />}
        >
          Finalize Attendance
        </Button>
      )}
    </div>
  );
};

export default AttendanceActions;

