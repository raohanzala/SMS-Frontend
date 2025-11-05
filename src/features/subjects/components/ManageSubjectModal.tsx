import Modal from "../../../components/common/Modal";
import CreateSubjectForm from "./CreateSubjectForm";
import { ManageSubjectModalProps } from "../types/subject-components.types";

const ManageSubjectModal = ({
  isManageSubjectModalOpen,
  onManageSubjectModalClose,
  subjectToEdit,
}: ManageSubjectModalProps) => {
  return (
    <Modal
      isOpen={isManageSubjectModalOpen}
      onClose={onManageSubjectModalClose}
    >
      <CreateSubjectForm
        onManageSubjectModalClose={onManageSubjectModalClose}
        subjectToEdit={subjectToEdit}
      />
    </Modal>
  );
};

export default ManageSubjectModal;

