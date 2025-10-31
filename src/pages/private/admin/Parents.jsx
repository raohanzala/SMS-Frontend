import { useState } from "react";
import ParentsTable from "@/features/Parents/ParentsTable";
import ParentsToolbar from "@/features/Parents/ParentsToolbar";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "@/components/common/ErrorMessage";
import AddParent from "@/features/Parents/AddParent";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useDeleteParent } from "@/features/Parents/useDeleteParent";
import { useParents } from "@/features/Parents/useParents";

const AdminParents = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [parentToDelete, setParentToDelete] = useState(null);
  const [parentToEdit, setParentToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, parents, error, isPending } = useParents()
  const { deleteParent, isDeleting } = useDeleteParent();

  const handleEdit = (parent) => {
    setParentToEdit(parent);
    setIsShowModal(true);
  }

  const handleDelete = (id) => {
    setParentToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (parentToDelete) {
      deleteParent(parentToDelete, {
        onSuccess: () => {
          setIsDeleteModal(false);
          setParentToDelete(null);
        },
      });
    }
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <ParentsToolbar onClick={() => setIsShowModal(true)} />

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
            <ParentsTable
              parents={parents}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            // <SubjectsCards
            //   parents={parents}
            //   onEdit={handleEdit}
            //   onDelete={handleDelete}
            // />
            null
          )}

          <Pagination pagination={pagination} />
        </>
      )}

      <AddParent
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        parentToEdit={parentToEdit}
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

export default AdminParents;
