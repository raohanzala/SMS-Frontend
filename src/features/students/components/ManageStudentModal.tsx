import Modal from "../../../components/common/Modal";
import CreateStudentForm from "./CreateStudentForm";
import { ManageStudentModalProps } from "../types/student-components.types";

const ManageStudentModal = ({
  isManageStudentModalOpen,
  onManageStudentModalClose,
  studentToEdit,
}: ManageStudentModalProps) => {
  return (
    <Modal
      isOpen={true}
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
