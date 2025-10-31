import Modal from "@/components/common/Modal";
import CreateParentForm from "./CreateParentForm";

function AddParent({ isOpen, onClose, parentToEdit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateParentForm onClose={onClose} parentToEdit={parentToEdit} />
    </Modal>
  );
}

export default AddParent;