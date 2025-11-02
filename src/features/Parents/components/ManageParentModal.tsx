import Modal from "@/components/common/Modal";
import CreateParentForm from "./CreateParentForm";
import { ManageParentModalProps } from "../types/parent-components.interface";

const ManageParentModal = ({ isOpen, onClose, parentToEdit }: ManageParentModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateParentForm onClose={onClose} parentToEdit={parentToEdit} />
    </Modal>
  );
}

export default ManageParentModal;