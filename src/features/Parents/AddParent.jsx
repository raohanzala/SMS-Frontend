import Modal from "@/components/common/Modal";
import CreateParentForm from "./CreateParentForm";

function AddParent({ isOpen, onClose, studentToEdit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateParentForm onClose={onClose} studentToEdit={studentToEdit} />
    </Modal>
  );
}

export default AddParent;