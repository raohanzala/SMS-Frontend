import Modal from "@/components/common/Modal";
import CreateParentForm from "./CreateParentForm";
import { ManageParentModalProps } from "../types/parent-components.interface";

const ManageParentModal = ({
  isManageParentModalOpen,
  onManageParentModalClose,
  parentToEdit,
  parentFormContext,
  onParentFormSuccess,
}: ManageParentModalProps) => {
  return (
    <Modal title="Add Parent" isOpen={isManageParentModalOpen} onClose={onManageParentModalClose}>
      <CreateParentForm
        onManageParentModalClose={onManageParentModalClose}
        parentToEdit={parentToEdit}
        parentFormContext={parentFormContext}
        onParentFormSuccess={onParentFormSuccess}
      />
    </Modal>
  );
};

export default ManageParentModal;
