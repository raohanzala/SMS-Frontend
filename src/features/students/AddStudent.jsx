import Modal from "../../components/common/Modal";
import CreateStudentForm from "./CreateStudentForm";

function AddStudent({ isOpen, onClose, studentToEdit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateStudentForm onClose={onClose} studentToEdit={studentToEdit} />
    </Modal>
  );
}

export default AddStudent;