import Modal from "@/components/common/Modal";
import CreateClassForm from "./CreateClassForm";

function AddClass({ isOpen, onClose, classToEdit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateClassForm onClose={onClose} classToEdit={classToEdit} />
    </Modal>
  );
}

export default AddClass;