import Modal from "@/components/common/Modal";
import PlanForm from "./PlanForm";
import { Plan } from "../types/plans.types";

interface ManagePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  planToEdit?: Plan | null;
}

const ManagePlanModal = ({ isOpen, onClose, planToEdit }: ManagePlanModalProps) => {
  return (
    <Modal
      title={planToEdit ? "Edit Plan" : "Create Plan"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PlanForm planToEdit={planToEdit} onClose={onClose} />
    </Modal>
  );
};

export default ManagePlanModal;

