import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import ManageTeacherModal from "../components/ManageTeacherModal";
import TeachersTable from "../components/TeachersTable";
import TeachersToolbar from "../components/TeachersToolbar";
import { useDeleteTeacher } from "../hooks/useDeleteTeacher";
import { useTeachers } from "../hooks/useTeachers";
import { Teacher } from "../types/teacher.types";

const TeachersPage = () => {
  const [teacherToEdit, setTeacherToEdit] = useState<Teacher | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [isShowManageTeacherModal, setIsShowManageTeacherModal] = useState(false);
  const [isShowTeacherDeleteModal, setIsShowTeacherDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, teachers, teachersError, isTeachersLoading } = useTeachers();
  const { deleteTeacherMutation, isDeletingTeacher } = useDeleteTeacher();

  const handleEditTeacher = useCallback((teacherToEdit: Teacher) => {
    setTeacherToEdit(teacherToEdit);
    setIsShowManageTeacherModal(true);
  }, []);

  const handleDeleteTeacher = useCallback((teacherId: string) => {
    setTeacherToDelete(teacherId);
    setIsShowTeacherDeleteModal(true);
  }, []);

  const handleShowManageTeacherModal = useCallback(() => {
    setIsShowManageTeacherModal(true);
  }, []);

  const handleCloseManageTeacherModal = useCallback(() => {
    setTeacherToEdit(null);
    setIsShowManageTeacherModal(false);
  }, []);

  const handleCloseTeacherDeleteModal = useCallback(() => {
    setTeacherToDelete(null);
    setIsShowTeacherDeleteModal(false);
  }, []);

  const handleConfirmTeacherDelete = useCallback(() => {
    if (teacherToDelete) {
      deleteTeacherMutation(teacherToDelete, {
        onSuccess: () => {
          setIsShowTeacherDeleteModal(false);
          setTeacherToDelete(null);
        },
      });
    }
  }, [deleteTeacherMutation, teacherToDelete]);

  return (
    <div className="space-y-6">
      <TeachersToolbar onClickAddTeacher={handleShowManageTeacherModal} />

      {isTeachersLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {teachersError && (
        <ErrorMessage
          message={teachersError.message || "Failed to load teachers"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isTeachersLoading && !teachersError && (
        <>
          {teachers?.length === 0 ? (
            <EmptyState
              icon={FiUser}
              title="No Teachers Found"
              description="Get started by adding your first teacher to the system."
              buttonText="Add Teacher"
              buttonIcon={FiUser}
              onButtonClick={handleShowManageTeacherModal}
            />
          ) : (
            <>
              {view === "table" ? (
                <TeachersTable
                  teachers={teachers}
                  onEditTeacher={handleEditTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                />
              ) : (
                // TeachersCards component can be added here later if needed
                <TeachersTable
                  teachers={teachers}
                  onEditTeacher={handleEditTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ManageTeacherModal
        isManageTeacherModalOpen={isShowManageTeacherModal}
        onManageTeacherModalClose={handleCloseManageTeacherModal}
        teacherToEdit={teacherToEdit}
      />

      <ConfirmationModal
        title="Delete Teacher"
        message="Are you sure you want to delete this teacher? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowTeacherDeleteModal}
        onClose={handleCloseTeacherDeleteModal}
        onConfirm={handleConfirmTeacherDelete}
        isLoading={isDeletingTeacher}
      />
    </div>
  );
};

export default TeachersPage;

