import Modal from "@/components/common/Modal";
import CreateClassForm from "./CreateClassForm";
import { ManageClassModalProps } from "../types/class-components.interface";

const ManageClassModal = ({ isManageClassModalOpen, onManageClassModalClose, classToEdit }: ManageClassModalProps) => {
  return (
    <Modal title="Add Class" isOpen={isManageClassModalOpen} onClose={onManageClassModalClose}>
      <CreateClassForm onClose={onManageClassModalClose} classToEdit={classToEdit} />
    </Modal>
  );
}

export default ManageClassModal;