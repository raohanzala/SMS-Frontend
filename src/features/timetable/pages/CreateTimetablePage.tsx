import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Button from "../../../components/common/Button";
import CreateTimetableForm from "../components/CreateTimetableForm";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { useTimetableById } from "../hooks/useTimtetableById";

const CreateTimetablePage = () => {
  const navigate = useNavigate();
  const { timetableId } = useParams<{ timetableId?: string }>();
  const isEditMode = !!timetableId;

  const { timetable, isTimetableLoading, timetableError } = useTimetableById();

  const handleClose = () => {
    navigate("/admin/timetable");
  };

  if (isEditMode && isTimetableLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (isEditMode && timetableError) {
    return (
      <div className="space-y-6">
        <ErrorMessage
          message={
            timetableError?.message || "Failed to load timetable entry"
          }
          onRetry={() => window.location.reload()}
        />
        <Button onClick={handleClose} startIcon={<FiArrowLeft />}>
          Back to Timetables
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button
              onClick={handleClose}
              variant="ghost"
              startIcon={<FiArrowLeft />}
            >
              Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? "Edit Timetable Entry" : "Create Timetable Entry"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditMode
              ? "Update the timetable entry details"
              : "Add a new timetable entry to the system"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <CreateTimetableForm
          timetableToEdit={timetable}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default CreateTimetablePage;

