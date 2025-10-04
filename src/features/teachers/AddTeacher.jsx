import Modal from "@/components/common/Modal";
import CreateTeacherForm from "./CreateTeacherForm";

function AddTeacher({ teacherToEdit, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateTeacherForm teacherToEdit={teacherToEdit} onClose={onClose} />
    </Modal>
  );
}

export default AddTeacher;