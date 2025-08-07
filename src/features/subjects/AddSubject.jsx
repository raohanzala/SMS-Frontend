import Modal from "../../components/common/Modal";
import CreateSubjectForm from "./CreateSubjectForm";

function AddSubject({ isOpen, onClose, subjectToEdit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateSubjectForm onClose={onClose} subjectToEdit={subjectToEdit} />
    </Modal>
  );
}

export default AddSubject;