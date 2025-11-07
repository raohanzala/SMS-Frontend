import { useCallback, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import ManageSubjectModal from "../components/ManageSubjectModal";
import SubjectsCards from "../components/SubjectsCards";
import SubjectsToolbar from "../components/SubjectsToolbar";
import { useDeleteSubject } from "../hooks/useDeleteSubject";
import { useSubjects } from "../hooks/useSubjects";
import { Subject } from "../types/subject.types";

const SubjectsPage = () => {
  const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [isShowManageSubjectModal, setIsShowManageSubjectModal] = useState(false);
  const [isShowSubjectDeleteModal, setIsShowSubjectDeleteModal] = useState(false);

  const { pagination, subjectsWithClass, subjectsError, isSubjectsLoading } = useSubjects();
  const { deleteSubjectMutation, isDeletingSubject } = useDeleteSubject();

  const handleEditSubject = useCallback((subjectToEdit: Subject) => {
    setSubjectToEdit(subjectToEdit);
    setIsShowManageSubjectModal(true);
  }, []);

  const handleDeleteSubject = useCallback((subjectId: string) => {
    setSubjectToDelete(subjectId);
    setIsShowSubjectDeleteModal(true);
  }, []);

  const handleShowManageSubjectModal = useCallback(() => {
    setIsShowManageSubjectModal(true);
  }, []);

  const handleCloseManageSubjectModal = useCallback(() => {
    setSubjectToEdit(null);
    setIsShowManageSubjectModal(false);
  }, []);

  const handleCloseSubjectDeleteModal = useCallback(() => {
    setSubjectToDelete(null);
    setIsShowSubjectDeleteModal(false);
  }, []);

  const handleConfirmSubjectDelete = useCallback(() => {
    if (subjectToDelete) {
      deleteSubjectMutation(subjectToDelete, {
        onSuccess: () => {
          setIsShowSubjectDeleteModal(false);
          setSubjectToDelete(null);
        },
      });
    }
  }, [deleteSubjectMutation, subjectToDelete]);

  return (
    <div className="space-y-6">
      <SubjectsToolbar onClickAddSubject={handleShowManageSubjectModal} />

      {isSubjectsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {subjectsError && (
        <ErrorMessage
          message={subjectsError.message || "Failed to load subjects"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isSubjectsLoading && !subjectsError && (
        <>
          {subjectsWithClass?.length === 0 ? (
            <EmptyState
              icon={FiBookOpen}
              title="No Subjects Found"
              description="Get started by adding your first subject to the system."
              buttonText="Add Subject"
              buttonIcon={FiBookOpen}
              onButtonClick={handleShowManageSubjectModal}
            />
          ) : (
            <>
                <SubjectsCards
                  subjects={subjectsWithClass}
                  onEditSubject={handleEditSubject}
                  onDeleteSubject={handleDeleteSubject}
                />

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ManageSubjectModal
        isManageSubjectModalOpen={isShowManageSubjectModal}
        onManageSubjectModalClose={handleCloseManageSubjectModal}
        subjectToEdit={subjectToEdit}
      />

      <ConfirmationModal
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowSubjectDeleteModal}
        onClose={handleCloseSubjectDeleteModal}
        onConfirm={handleConfirmSubjectDelete}
        isLoading={isDeletingSubject}
      />
    </div>
  );
};

export default SubjectsPage;

