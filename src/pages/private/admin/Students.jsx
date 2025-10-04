import { useState } from "react";
import StudentsTable from "@/features/students/StudentsTable";
import StudentsToolbar from "@/features/students/StudentsToolbar";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import AddStudent from "@/features/students/AddStudent";
import Pagination from "@/components/common/Pagination";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import { useSearchParams } from "react-router-dom";
import { useStudents } from "@/features/students/useStudents";
import { useDeleteStudent } from "@/features/students/useDeleteStudent";
import StudentsCards from "../../../features/students/StudentsCards";

const AdminStudents = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "cards";
  const { pagination, students, error, isPending } = useStudents()
  const { deleteStudent, isDeleting } = useDeleteStudent()

  const handleEdit = (student) => {
    setStudentToEdit(student);
    setIsShowModal(true);
  }

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete, {
        onSuccess: () => {
          setIsDeleteModal(false);
          setStudentToDelete(null);
        },
      });
    }
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <StudentsToolbar onClick={() => setIsShowModal(true)} />

      {/* Filters and Search */}
      {isPending && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {error && (
        <ErrorMessage
          message={error.message || "Failed to load subjects"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isPending && !error && (
        <>
          {view === "table" ? (
            <StudentsTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <StudentsCards
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          <Pagination pagination={pagination} />
        </>
      )}

      <AddStudent
        isOpen={isShowModal}
        onClose={() => { setStudentToEdit(null); setIsShowModal(false) }}
        studentToEdit={studentToEdit}
      />

      <ConfirmationModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="Delete Student"
        message="Are you sure you want to delete parent? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </div >
  );
};

export default AdminStudents;
