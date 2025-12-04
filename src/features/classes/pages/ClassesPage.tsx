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
import ClassesCards from "../components/ClassesCards";
import ClassesToolbar from "../components/ClassesToolbar";
import { useDeleteClass } from "../hooks/useDeleteClass";
import { useBulkDeleteClasses } from "../hooks/useBulkDeleteClasses";
import { useClasses } from "../hooks/useClasses";
import { Class } from "../types/class.types";

const ClassesPage = () => {
  const [classToEdit, setClassToEdit] = useState<Class | null>(null);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [isShowManageClassModal, setIsShowManageClassModal] = useState(false);
  const [isShowClassDeleteModal, setIsShowClassDeleteModal] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<Set<string>>(new Set());
  const [isShowBulkDeleteModal, setIsShowBulkDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, classes, classesError, isClassesLoading } = useClasses();
  const { deleteClassMutation, isDeletingClass } = useDeleteClass();
  const { bulkDeleteClassesMutation, isBulkDeletingClasses } = useBulkDeleteClasses();

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

  // Selection handlers
  const handleToggleSelect = useCallback((classId: string) => {
    setSelectedClasses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(classId)) {
        newSet.delete(classId);
      } else {
        newSet.add(classId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (classes) {
      setSelectedClasses(new Set(classes.map((c: Class) => c._id)));
    }
  }, [classes]);

  const handleDeselectAll = useCallback(() => {
    setSelectedClasses(new Set());
  }, []);

  const handleBulkDelete = useCallback(() => {
    setIsShowBulkDeleteModal(true);
  }, []);

  const handleConfirmBulkDelete = useCallback(() => {
    if (selectedClasses.size > 0) {
      bulkDeleteClassesMutation(Array.from(selectedClasses), {
        onSuccess: () => {
          setIsShowBulkDeleteModal(false);
          setSelectedClasses(new Set());
        },
      });
    }
  }, [bulkDeleteClassesMutation, selectedClasses]);

  const handleCloseBulkDeleteModal = useCallback(() => {
    setIsShowBulkDeleteModal(false);
  }, []);

  return (
    <div className="space-y-6">
      <ClassesToolbar 
        onClickAddClass={handleShowManageClassModal}
        selectedCount={selectedClasses.size}
        onBulkDelete={handleBulkDelete}
        isDeleting={isBulkDeletingClasses}
      />

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
                  selectedClasses={selectedClasses}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                />
              ) : (
                <ClassesCards
                  classes={classes}
                  onEditClass={handleEditClass}
                  onDeleteClass={handleDeleteClass}
                  selectedClasses={selectedClasses}
                  onToggleSelect={handleToggleSelect}
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

      <ConfirmationModal
        title="Delete Selected Classes"
        message={`Are you sure you want to delete ${selectedClasses.size} selected class(es)? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowBulkDeleteModal}
        onClose={handleCloseBulkDeleteModal}
        onConfirm={handleConfirmBulkDelete}
        isLoading={isBulkDeletingClasses}
      />
    </div>
  );
};

export default ClassesPage; 