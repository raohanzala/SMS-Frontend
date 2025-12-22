import Modal from "@/components/common/Modal";
import CreateSessionForm from "./CreateSessionForm";
import { ManageSessionModalProps } from "../types/session-components.types";

const ManageSessionModal = ({ isManageSessionModalOpen, onManageSessionModalClose, sessionToEdit }: ManageSessionModalProps) => {
  return (
    <Modal title="Add Session" isOpen={isManageSessionModalOpen} onClose={onManageSessionModalClose}>
      <CreateSessionForm onClose={onManageSessionModalClose} sessionToEdit={sessionToEdit} />
    </Modal>
  );
}

export default ManageSessionModal;

