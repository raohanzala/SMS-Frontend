import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSubjects } from "@/features/subjects/useSubjects";
import { useDeleteSubject } from "@/features/subjects/useDeleteSubject";

import SubjectsToolbar from "@/features/subjects/SubjectsToolbar";
import SubjectsTable from "@/features/subjects/SubjectsTable";
import Pagination from "@/components/common/Pagination";
import AddSubject from "@/features/subjects/AddSubject";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import SubjectsCards from "@/features/subjects/SubjectsCards";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function AdminSubjects() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";

  const { subjects, isPending, error, pagination } = useSubjects();
  const { deleteSubject, isDeleting } = useDeleteSubject();

  const handleEdit = (subject) => {
    setSubjectToEdit(subject);
    setIsShowModal(true);
  }

  const handleDelete = (id) => {
    setSubjectToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      deleteSubject(subjectToDelete, {
        onSuccess: () => {
          setIsDeleteModal(false);
          setSubjectToDelete(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <SubjectsToolbar onClick={() => setIsShowModal(true)} />

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
            <SubjectsTable
              subjects={subjects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <SubjectsCards
              subjects={subjects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          <Pagination pagination={pagination} />
        </>
      )}

      <AddSubject
        isOpen={isShowModal}
        onClose={() => {
          setIsShowModal(false);
          setSubjectToEdit(null);
        }}
        subjectToEdit={subjectToEdit}
      />

      <ConfirmationModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
