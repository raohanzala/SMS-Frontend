import { useCallback, useState } from "react";
import ParentsTable from "../components/ParentsTable";
import ParentsCards from "../components/ParentsCards";
import ParentsToolbar from "../components/ParentsToolbar";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "@/components/common/ErrorMessage";
import ManageParentModal from "../components/ManageParentModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useDeleteParent } from "../hooks/useDeleteParent";
import { useParents } from "../hooks/useParents";
import { Parent } from "../types/parent.types";
import EmptyState from "@/components/common/EmptyState";
import { FiUser } from "react-icons/fi";

const ParentsPage = () => {
  const [parentToEdit, setParentToEdit] = useState<Parent | null>(null);
  const [parentToDelete, setParentToDelete] = useState<string | null>(null);
  const [isShowManageParentModal, setIsShowManageParentModal] = useState(false);
  const [isShowParentDeleteModal, setIsShowParentDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, parents, parentsError, isParentsLoading } = useParents();
  const { deleteParentMutation, isDeletingParent } = useDeleteParent();

  const handleEditParent = useCallback((parentToEdit: Parent) => {
    setParentToEdit(parentToEdit);
    setIsShowManageParentModal(true);
  }, []);

  const handleDeleteParent = useCallback((parentId: string) => {
    setParentToDelete(parentId);
    setIsShowParentDeleteModal(true);
  }, []);

  const handleShowManageParentModal = useCallback(() => {
    setIsShowManageParentModal(true);
  }, []);

  const handleCloseManageParentModal = useCallback(() => {
    setParentToEdit(null);
    setIsShowManageParentModal(false);
  }, []);

  const handleCloseParentDeleteModal = useCallback(() => {
    setParentToDelete(null);
    setIsShowParentDeleteModal(false);
  }, []);

  const handleConfirmParentDelete = useCallback(() => {
    if (parentToDelete) {
      deleteParentMutation(parentToDelete, {
        onSuccess: () => {
          setIsShowParentDeleteModal(false);
          setParentToDelete(null);
        },
      });
    }
  }, [deleteParentMutation, parentToDelete]);

  return (
    <div className="space-y-6">
      <ParentsToolbar onClickAddParent={handleShowManageParentModal} />

      {isParentsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {parentsError && (
        <ErrorMessage
          message={parentsError.message || "Failed to load parents"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isParentsLoading && !parentsError && (
        <>
          {parents?.length === 0 ? (
            <EmptyState
              icon={FiUser}
              title="No Parents Found"
              description="Get started by adding your first parent to the system."
              buttonText="Add Parent"
              buttonIcon={FiUser}
              onButtonClick={handleShowManageParentModal}
            />
          ) : (
            <>
              {view === "table" ? (
                <ParentsTable
                  parents={parents}
                  onEditParent={handleEditParent}
                  onDeleteParent={handleDeleteParent}
                />
              ) : (
                <ParentsCards
                  parents={parents}
                  onEditParent={handleEditParent}
                  onDeleteParent={handleDeleteParent}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ManageParentModal
        isManageParentModalOpen={isShowManageParentModal}
        onManageParentModalClose={handleCloseManageParentModal}
        parentToEdit={parentToEdit}
      />

      <ConfirmationModal
        title="Delete Parent"
        message="Are you sure you want to delete parent? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowParentDeleteModal}
        onClose={handleCloseParentDeleteModal}
        onConfirm={handleConfirmParentDelete}
        isLoading={isDeletingParent}
      />
    </div>
  );
};

export default ParentsPage;
