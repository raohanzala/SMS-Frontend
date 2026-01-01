import { useCallback, useState } from "react";
import { Plus, CreditCard } from "lucide-react";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import PlansTable from "../components/PlansTable";
import ManagePlanModal from "../components/ManagePlanModal";
import { usePlans } from "../hooks/usePlans";
import { useDeletePlan } from "../hooks/useDeletePlan";
import { Plan } from "../types/plans.types";

const PlansPage = () => {
  const [planToEdit, setPlanToEdit] = useState<Plan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [isShowManagePlanModal, setIsShowManagePlanModal] = useState(false);
  const [isShowPlanDeleteModal, setIsShowPlanDeleteModal] = useState(false);

  const { plans, isPlansLoading, plansError } = usePlans();
  const { deletePlanMutation, isDeletingPlan } = useDeletePlan();

  const handleEditPlan = useCallback((plan: Plan) => {
    setPlanToEdit(plan);
    setIsShowManagePlanModal(true);
  }, []);

  const handleDeletePlan = useCallback((planId: string) => {
    setPlanToDelete(planId);
    setIsShowPlanDeleteModal(true);
  }, []);

  const handleShowManagePlanModal = useCallback(() => {
    setPlanToEdit(null);
    setIsShowManagePlanModal(true);
  }, []);

  const handleCloseManagePlanModal = useCallback(() => {
    setPlanToEdit(null);
    setIsShowManagePlanModal(false);
  }, []);

  const handleClosePlanDeleteModal = useCallback(() => {
    setPlanToDelete(null);
    setIsShowPlanDeleteModal(false);
  }, []);

  const handleConfirmPlanDelete = useCallback(() => {
    if (planToDelete) {
      deletePlanMutation(planToDelete, {
        onSuccess: () => {
          setIsShowPlanDeleteModal(false);
          setPlanToDelete(null);
        },
      });
    }
  }, [deletePlanMutation, planToDelete]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Subscription Plans</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage subscription plans and pricing for schools
          </p>
        </div>
        <Button
          onClick={handleShowManagePlanModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Create Plan
        </Button>
      </div>

      {isPlansLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {plansError && (
        <ErrorMessage
          message={plansError.message || "Failed to load plans"}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isPlansLoading && !plansError && (
        <>
          {plans?.length === 0 ? (
            <EmptyState
              icon={CreditCard}
              title="No Plans Found"
              description="Get started by creating your first subscription plan."
              buttonText="Create Plan"
              buttonIcon={Plus}
              onButtonClick={handleShowManagePlanModal}
            />
          ) : (
            <PlansTable
              plans={plans}
              onEditPlan={handleEditPlan}
              onDeletePlan={handleDeletePlan}
            />
          )}
        </>
      )}

      {/* Create/Edit Plan Modal */}
      <ManagePlanModal
        isOpen={isShowManagePlanModal}
        onClose={handleCloseManagePlanModal}
        planToEdit={planToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        title="Delete Plan"
        message="Are you sure you want to delete this plan? This action cannot be undone. Note: Plans with active subscriptions cannot be deleted."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowPlanDeleteModal}
        onClose={handleClosePlanDeleteModal}
        onConfirm={handleConfirmPlanDelete}
        isLoading={isDeletingPlan}
      />
    </div>
  );
};

export default PlansPage;

