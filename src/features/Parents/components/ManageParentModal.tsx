import Modal from "@/components/common/Modal";
import CreateParentForm from "./CreateParentForm";
import { ManageParentModalProps } from "../types/parent-components.interface";

const ManageParentModal = ({ isManageParentModalOpen, onManageParentModalClose, parentToEdit }: ManageParentModalProps) => {
  return (
    <Modal isOpen={isManageParentModalOpen} onClose={onManageParentModalClose}>
      <CreateParentForm onManageParentModalClose={onManageParentModalClose} parentToEdit={parentToEdit} />
    </Modal>
  );
}

export default ManageParentModal;