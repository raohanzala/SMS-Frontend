import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import TimetableTable from "../components/TimetableTable";
import TimetableToolbar from "../components/TimetableToolbar";
import { useDeleteTimetable } from "../hooks/useDeleteTimetable";
import { useTimetables } from "../hooks/useTimetables";

const TimetablesPage = () => {
  const navigate = useNavigate();
  const [timetableToDelete, setTimetableToDelete] = useState<string | null>(null);
  const [isShowTimetableDeleteModal, setIsShowTimetableDeleteModal] = useState(false);

  const { pagination, timetables, timetablesError, isTimetablesLoading } = useTimetables();
  const { deleteTimetableMutation, isDeletingTimetable } = useDeleteTimetable();

  const handleEditTimetable = useCallback((timetable: any) => {
    navigate(`/admin/timetable/create/${timetable._id}`);
  }, [navigate]);

  const handleDeleteTimetable = useCallback((timetableId: string) => {
    setTimetableToDelete(timetableId);
    setIsShowTimetableDeleteModal(true);
  }, []);

  const handleShowCreateTimetable = useCallback(() => {
    navigate("/admin/timetable/create");
  }, [navigate]);

  const handleCloseTimetableDeleteModal = useCallback(() => {
    setTimetableToDelete(null);
    setIsShowTimetableDeleteModal(false);
  }, []);

  const handleConfirmTimetableDelete = useCallback(() => {
    if (timetableToDelete) {
      deleteTimetableMutation(timetableToDelete, {
        onSuccess: () => {
          setIsShowTimetableDeleteModal(false);
          setTimetableToDelete(null);
        },
      });
    }
  }, [deleteTimetableMutation, timetableToDelete]);

  return (
    <div className="space-y-6">
      <TimetableToolbar onClickAddTimetable={handleShowCreateTimetable} />

      {isTimetablesLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {timetablesError && (
        <ErrorMessage
          message={timetablesError.message || "Failed to load timetable entries"}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isTimetablesLoading && !timetablesError && (
        <>
          {timetables?.length === 0 ? (
            <EmptyState
              icon={FiCalendar}
              title="No Timetable Entries Found"
              description="Get started by adding your first timetable entry to the system."
              buttonText="Add Timetable Entry"
              buttonIcon={FiCalendar}
              onButtonClick={handleShowCreateTimetable}
            />
          ) : (
            <>
              <TimetableTable
                timetables={timetables}
                onEditTimetable={handleEditTimetable}
                onDeleteTimetable={handleDeleteTimetable}
              />

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ConfirmationModal
        title="Delete Timetable Entry"
        message="Are you sure you want to delete this timetable entry? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowTimetableDeleteModal}
        onClose={handleCloseTimetableDeleteModal}
        onConfirm={handleConfirmTimetableDelete}
        isLoading={isDeletingTimetable}
      />
    </div>
  );
};

export default TimetablesPage;

