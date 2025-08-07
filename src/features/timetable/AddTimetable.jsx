import Modal from "../../components/common/Modal";
import CreateTimetableForm from "./CreateTimetableForm";

function AddTimetable({ teacherToEdit, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateTimetableForm teacherToEdit={teacherToEdit} onClose={onClose} />
    </Modal>
  );
}

export default AddTimetable;