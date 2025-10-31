import Modal from "@/components/common/Modal";
import CreateStudentForm from "./CreateStudentForm";

function ManageStudentModal({ isManageStudentModalOpen, onManageStudentModalClose, studentToEdit }) {
  return (
    <Modal isOpen={isManageStudentModalOpen} onClose={onManageStudentModalClose}>
      <CreateStudentForm onClose={onManageStudentModalClose} studentToEdit={studentToEdit} />
    </Modal>
  );
}

export default ManageStudentModal;