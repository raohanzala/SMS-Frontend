import Modal from "@/components/common/Modal";
import CreateTimetableForm from "./CreateTimetableForm";
import { ManageTimetableModalProps } from "../types/timetable-components.types";

const ManageTimetableModal = ({
  isManageTimetableModalOpen,
  onManageTimetableModalClose,
  timetableToEdit,
}: ManageTimetableModalProps) => {
  return (
    <Modal
      isOpen={isManageTimetableModalOpen}
      onClose={onManageTimetableModalClose}
      title={timetableToEdit ? "Edit Timetable Entry" : "Add Timetable Entry"}
      size="lg"
    >
      <CreateTimetableForm
        onClose={onManageTimetableModalClose}
        timetableToEdit={timetableToEdit}
      />
    </Modal>
  );
};

export default ManageTimetableModal;

