import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { useDeleteStudent } from "../hooks/useDeleteStudent";
import { useStudents } from "../hooks/useStudents";
import { Student } from "../types/student.types";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import StudentsCards from "../components/StudentsCards";
import StudentsTable from "../components/StudentsTable";
import StudentsToolbar from "../components/StudentsToolbar";
import { useSelectable } from "@/hooks/useSelectable";
import { useBulkDeleteStudents } from "../hooks/useBulkDeleteStudents";

const StudentsPage = () => {
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isShowStudentDeleteModal, setIsShowStudentDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const view = searchParams.get("view") || "cards";
  const { pagination, students, studentsError, isStudentsLoading } = useStudents();
  const { deleteStudentMutation, isDeletingStudent } = useDeleteStudent();
  const { bulkDeleteStudentsMutation, isBulkDeletingStudents } = useBulkDeleteStudents();
  const [isShowBulkDeleteModal, setIsShowBulkDeleteModal] = useState(false);


  const {
    selectedItems: selectedStudents,
    handleToggleSelect,
    handleSelectAll,
    handleDeselectAll,
    setSelectedItems
  } = useSelectable(students || []);

  const handleEditStudent = useCallback((studentToEdit: Student) => {
    navigate(`/admin/students/${studentToEdit._id}/edit`);
  }, [navigate]);

  const handleDeleteStudent = useCallback((student: Student) => {
    setStudentToDelete(student);
    setIsShowStudentDeleteModal(true);
  }, []);

  const handleShowManageStudentModal = useCallback(() => {
    navigate('/admin/students/new');
  }, [navigate]);

  const handleCloseStudentDeleteModal = useCallback(() => {
    setStudentToDelete(null);
    setIsShowStudentDeleteModal(false);
  }, []);

  const handleConfirmStudentDelete = useCallback(() => {
    if (studentToDelete) {
      deleteStudentMutation(studentToDelete._id, {
        onSuccess: () => {
          setIsShowStudentDeleteModal(false);
          setStudentToDelete(null);
        },
      });
    }
  }, [deleteStudentMutation, studentToDelete]);

  const handleBulkDelete = useCallback(() => {
    setIsShowBulkDeleteModal(true);
  }, []);

  const handleConfirmBulkDelete = useCallback(() => {
    if (selectedStudents) {
      bulkDeleteStudentsMutation(Array.from(selectedStudents), {
        onSuccess: () => {
          setIsShowBulkDeleteModal(false);
          setSelectedItems(new Set());
        },
      });
    }
  }, [bulkDeleteStudentsMutation, selectedStudents, setSelectedItems]);

  const handleCloseBulkDeleteModal = useCallback(() => {
    setIsShowBulkDeleteModal(false);
  }, []);

  return (
    <div className="space-y-6">
      <StudentsToolbar 
      onClickAddStudent={handleShowManageStudentModal}
      selectedCount={selectedStudents.size}
      onBulkDelete={handleBulkDelete}
      onCancelSelection={()=> setSelectedItems(new Set())}
      isDeleting={isBulkDeletingStudents}
       />

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
                  totalStudents={pagination.totalStudents}
                  onEditStudent={handleEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                  selectedStudents={selectedStudents}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                />
              ) : (
                <StudentsCards
                  students={students}
                  onEditStudent={handleEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                  selectedStudents={selectedStudents}
                  onToggleSelect={handleToggleSelect}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}
      <ConfirmationModal
        title="Delete Student"
        message={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
        isOpen={isShowStudentDeleteModal}
        onClose={handleCloseStudentDeleteModal}
        onConfirm={handleConfirmStudentDelete}  
        isLoading={isDeletingStudent} />

<ConfirmationModal
        title="Delete Selected Students"
        message={`Are you sure you want to delete ${selectedStudents.size} selected students? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowBulkDeleteModal}
        onClose={handleCloseBulkDeleteModal}
        onConfirm={handleConfirmBulkDelete}
        isLoading={isBulkDeletingStudents}
      />
    </div>
  );
};

export default StudentsPage;
