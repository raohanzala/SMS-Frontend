import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiBook } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import ManageClassModal from "../components/ManageClassModal";
import ClassesTable from "../components/ClassesTable";
import ClassesToolbar from "../components/ClassesToolbar";
import { useDeleteClass } from "../hooks/useDeleteClass";
import { useClasses } from "../hooks/useClasses";
import { Class } from "../types/class.types";

const ClassesPage = () => {
  const [classToEdit, setClassToEdit] = useState<Class | null>(null);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [isShowManageClassModal, setIsShowManageClassModal] = useState(false);
  const [isShowClassDeleteModal, setIsShowClassDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, classes, classesError, isClassesLoading } = useClasses();
  const { deleteClassMutation, isDeletingClass } = useDeleteClass();

  const handleEditClass = useCallback((classToEdit: Class) => {
    setClassToEdit(classToEdit);
    setIsShowManageClassModal(true);
  }, []);

  const handleDeleteClass = useCallback((classId: string) => {
    setClassToDelete(classId);
    setIsShowClassDeleteModal(true);
  }, []);

  const handleShowManageClassModal = useCallback(() => {
    setIsShowManageClassModal(true);
  }, []);

  const handleCloseManageClassModal = useCallback(() => {
    setClassToEdit(null);
    setIsShowManageClassModal(false);
  }, []);

  const handleCloseClassDeleteModal = useCallback(() => {
    setClassToDelete(null);
    setIsShowClassDeleteModal(false);
  }, []);

  const handleConfirmClassDelete = useCallback(() => {
    if (classToDelete) {
      deleteClassMutation(classToDelete, {
        onSuccess: () => {
          setIsShowClassDeleteModal(false);
          setClassToDelete(null);
        },
      });
    }
  }, [deleteClassMutation, classToDelete]);

  return (
    <div className="space-y-6">
      <ClassesToolbar onClickAddClass={handleShowManageClassModal} />

      {isClassesLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {classesError && (
        <ErrorMessage
          message={classesError.message || "Failed to load classes"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isClassesLoading && !classesError && (
        <>
          {classes?.length === 0 ? (
            <EmptyState
              icon={FiBook}
              title="No Classes Found"
              description="Get started by adding your first class to the system."
              buttonText="Add Class"
              buttonIcon={FiBook}
              onButtonClick={handleShowManageClassModal}
            />
          ) : (
            <>
              {view === "table" ? (
                <ClassesTable
                  classes={classes}
                  onEditClass={handleEditClass}
                  onDeleteClass={handleDeleteClass}
                />
              ) : (
                // ClassesCards component can be added here later if needed
                <ClassesTable
                  classes={classes}
                  onEditClass={handleEditClass}
                  onDeleteClass={handleDeleteClass}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ManageClassModal
        isManageClassModalOpen={isShowManageClassModal}
        onManageClassModalClose={handleCloseManageClassModal}
        classToEdit={classToEdit}
      />

      <ConfirmationModal
        title="Delete Class"
        message="Are you sure you want to delete this class? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowClassDeleteModal}
        onClose={handleCloseClassDeleteModal}
        onConfirm={handleConfirmClassDelete}
        isLoading={isDeletingClass}
      />
    </div>
  );
};

export default ClassesPage; 