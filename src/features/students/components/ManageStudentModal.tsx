import Modal from "../../../components/common/Modal";
import { Student } from "../types/student.types";
import CreateStudentForm from "./CreateStudentForm";

interface ManageStudentModalProps {
  isManageStudentModalOpen: boolean;
  onManageStudentModalClose: () => void;
  studentToEdit: Student | null;
}

function ManageStudentModal({
  isManageStudentModalOpen,
  onManageStudentModalClose,
  studentToEdit,
}: ManageStudentModalProps) {
  return (
    <Modal
      isOpen={isManageStudentModalOpen}
      onClose={onManageStudentModalClose}
    >
      <CreateStudentForm
        onManageStudentModalClose={onManageStudentModalClose}
        studentToEdit={studentToEdit}
      />
    </Modal>
  );
}

export default ManageStudentModal;
