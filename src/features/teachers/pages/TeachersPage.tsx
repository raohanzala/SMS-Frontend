import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import TeachersTable from "../components/TeachersTable";
import TeachersCards from "../components/TeachersCards";
import TeachersToolbar from "../components/TeachersToolbar";
import { useDeleteTeacher } from "../hooks/useDeleteTeacher";
import { useTeachers } from "../hooks/useTeachers";
import { Teacher } from "../types/teacher.types";
import { useSelectable } from "@/hooks/useSelectable";

const TeachersPage = () => {
  const navigate = useNavigate();
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [isShowTeacherDeleteModal, setIsShowTeacherDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, teachers, teachersError, isTeachersLoading } = useTeachers();
  const { deleteTeacherMutation, isDeletingTeacher } = useDeleteTeacher();

  const {
    selectedItems: selectedTeachers,
    handleToggleSelect,
    handleSelectAll,
    handleDeselectAll,
    setSelectedItems
  } = useSelectable(teachers || []);

  const handleEditTeacher = useCallback((teacher: Teacher) => {
    navigate(`/admin/teachers/${teacher._id}/edit`);
  }, [navigate]);

  const handleDeleteTeacher = useCallback((teacherId: string) => {
    setTeacherToDelete(teacherId);
    setIsShowTeacherDeleteModal(true);
  }, []);

  const handleShowAddTeacher = useCallback(() => {
    navigate("/admin/teachers/new");
  }, [navigate]);

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
      <TeachersToolbar onClickAddTeacher={handleShowAddTeacher} />

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
              onButtonClick={handleShowAddTeacher}
            />
          ) : (
            <>
              {view === "table" ? (
                <TeachersTable
                  teachers={teachers}
                  onEditTeacher={handleEditTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                  selectedTeachers={selectedTeachers}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                />
              ) : (
                <TeachersCards
                  teachers={teachers}
                  onEditTeacher={handleEditTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                  selectedTeachers={selectedTeachers}
                  onToggleSelect={handleToggleSelect}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

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

