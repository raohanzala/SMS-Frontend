import { useState } from "react";
import StudentsTable from '../components/StudentsTable'
import StudentsToolbar from '../components/StudentsToolbar'
import ConfirmationModal from "@/components/common/ConfirmationModal";
import Pagination from "@/components/common/Pagination";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import { useSearchParams } from "react-router-dom";
import StudentsCards from "../components/StudentsCards";
import { useStudents } from "../hooks/useStudents";
import { useDeleteStudent } from '../hooks/useDeleteStudent'
import ManageStudentModal from "../components/ManageStudentModal";

const StudentsPage = () => {
  const [isShowManageStudentModal, setIsShowManageStudentModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isShowStudentDeleteModal, setIsShowStudentDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "cards";
  const { pagination, students, studentsError, isStudentsLoading } = useStudents();
  const { deleteStudentMutation, isStudentDeleting } = useDeleteStudent();

  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setIsShowManageStudentModal(true);
  };

  const handleDeleteStudent = (studentId) => {
    setStudentToDelete(studentId);
    setIsShowStudentDeleteModal(true);
  };

  const handleShowManageStudentModal = () => {
    () => setIsShowManageStudentModal(true)
  }

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      deleteStudentMutation(studentToDelete, {
        onSuccess: () => {
          setIsShowStudentDeleteModal(false);
          setStudentToDelete(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <StudentsToolbar onClickAddStudent={handleShowManageStudentModal} />

      {/* Filters and Search */}
      {isStudentsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {studentsError && (
        <ErrorMessage
          message={studentsError.message || "Failed to load subjects"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isStudentsLoading && !studentsError && (
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

      <ManageStudentModal
        isManageStudentModalOpen={isShowManageStudentModal}
        onManageStudentModalClose={() => {
          setStudentToEdit(null);
          setIsShowManageStudentModal(false);
        }}
        studentToEdit={studentToEdit}
      />

      <ConfirmationModal
        isStudentDeleteModalOpen={isShowStudentDeleteModal}
        onStudentDeleteModalClose={() => setIsShowStudentDeleteModal(false)}
        title="Delete Student"
        message="Are you sure you want to delete parent? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleConfirmDelete}
        isLoading={isStudentDeleting}
      />
    </div>
  );
};

export default StudentsPage;
