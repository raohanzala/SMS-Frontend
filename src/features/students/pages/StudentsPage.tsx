import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import ManageStudentModal from "../components/ManageStudentModal";
import StudentsCards from "../components/StudentsCards";
import StudentsTable from "../components/StudentsTable";
import StudentsToolbar from "../components/StudentsToolbar";
import { useDeleteStudent } from "../hooks/useDeleteStudent";
import { useStudents } from "../hooks/useStudents";
import { Student } from "../types/student.types";

const StudentsPage = () => {
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isShowManageStudentModal, setIsShowManageStudentModal] = useState(false);
  const [isShowStudentDeleteModal, setIsShowStudentDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "cards";
  const { pagination, students, studentsError, isStudentsLoading } = useStudents();
  const { deleteStudentMutation, isDeletingStudent } = useDeleteStudent();

  const handleEditStudent = useCallback((studentToEdit: Student) => {
    setStudentToEdit(studentToEdit);
    setIsShowManageStudentModal(true);
  }, []);

  const handleDeleteStudent = useCallback((studentId: string) => {
    setStudentToDelete(studentId);
    setIsShowStudentDeleteModal(true);
  }, []);

  const handleShowManageStudentModal = useCallback(() => {
    setIsShowManageStudentModal(true);
  }, []);

  const handleCloseManageStudentModal = useCallback(() => {
    setStudentToEdit(null);
    setIsShowManageStudentModal(false);
  }, []);

  const handleCloseStudentDeleteModal = useCallback(() => {
    setStudentToDelete(null);
    setIsShowStudentDeleteModal(false);
  }, []);

  const handleConfirmStudentDelete = useCallback(() => {
    if (studentToDelete) {
      deleteStudentMutation(studentToDelete, {
        onSuccess: () => {
          setIsShowStudentDeleteModal(false);
          setStudentToDelete(null);
        },
      });
    }
  }, [deleteStudentMutation, studentToDelete]);

  return (
    <div className="space-y-6">
      <StudentsToolbar onClickAddStudent={handleShowManageStudentModal} />

      {isStudentsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {studentsError && (
        <ErrorMessage
          message={studentsError.message || "Failed to load students"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isStudentsLoading && !studentsError && (
        <>
          {students?.length === 0 ? (
            <EmptyState
              icon={FiUsers}
              title="No Students Found"
              description="Get started by adding your first student to the system."
              buttonText="Add Student"
              buttonIcon={FiUsers}
              onButtonClick={handleShowManageStudentModal}
            />
          ) : (
            <>
              {view === "table" ? (
                <StudentsTable
                  students={students}
                  onEditStudent={handleEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              ) : (
                <StudentsCards
                  students={students}
                  onEditStudent={handleEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ManageStudentModal
        isManageStudentModalOpen={isShowManageStudentModal}
        onManageStudentModalClose={handleCloseManageStudentModal}
        studentToEdit={studentToEdit}
      />

      <ConfirmationModal
        title="Delete Student"
        message="Are you sure you want to delete parent? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowStudentDeleteModal}
        onClose={handleCloseStudentDeleteModal}
        onConfirm={handleConfirmStudentDelete}
        isLoading={isDeletingStudent}
      />
    </div>
  );
};

export default StudentsPage;
