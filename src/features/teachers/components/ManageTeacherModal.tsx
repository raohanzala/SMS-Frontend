import Modal from "../../../components/common/Modal";
import { ManageTeacherModalProps } from "../types/teacher-components.types";
import CreateTeacherForm from "./CreateTeacherForm";

const ManageTeacherModal = ({
  isManageTeacherModalOpen,
  onManageTeacherModalClose,
  teacherToEdit,
}: ManageTeacherModalProps) => {
  return (
    <Modal
      isOpen={isManageTeacherModalOpen}
      onClose={onManageTeacherModalClose}
    >
      <CreateTeacherForm
        onManageTeacherModalClose={onManageTeacherModalClose}
        teacherToEdit={teacherToEdit}
      />
    </Modal>
  );
};

export default ManageTeacherModal;

