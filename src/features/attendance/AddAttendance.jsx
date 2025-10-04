import Modal from "@/components/common/Modal";
import CreateAttendanceForm from "./CreateAttendanceForm";

function AddAttendance({ isOpen, onClose, attendanceToEdit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateAttendanceForm onClose={onClose} attendanceToEdit={attendanceToEdit} />
    </Modal>
  );
}

export default AddAttendance;