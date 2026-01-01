import { useState, useCallback } from "react";
import { CreditCard, Plus } from "lucide-react";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { useAssignPlan } from "../hooks/useAssignPlan";
import { useCancelSubscription } from "../hooks/useCancelSubscription";
import SubscriptionsTable from "../components/SubscriptionsTable";
import AssignPlanModal from "../components/AssignPlanModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import Filter from "@/components/common/Filter";
import { Subscription, AssignPlanInput } from "../types/subscriptions.types";

export default function SubscriptionsPage() {
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<Subscription | null>(null);
  const [isShowAssignModal, setIsShowAssignModal] = useState(false);
  const [isShowCancelModal, setIsShowCancelModal] = useState(false);

  const { subscriptions, pagination, isSubscriptionsLoading, subscriptionsError } =
    useSubscriptions();
  const { assignPlanMutation, isAssigningPlan } = useAssignPlan();
  const { cancelSubscriptionMutation, isCancellingSubscription } = useCancelSubscription();

  const handleAssignPlan = useCallback(() => {
    setIsShowAssignModal(true);
  }, []);

  const handleCloseAssignModal = useCallback(() => {
    setIsShowAssignModal(false);
  }, []);

  const handleCancel = useCallback((subscription: Subscription) => {
    setSubscriptionToCancel(subscription);
    setIsShowCancelModal(true);
  }, []);

  const handleCloseCancelModal = useCallback(() => {
    setSubscriptionToCancel(null);
    setIsShowCancelModal(false);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    if (subscriptionToCancel) {
      cancelSubscriptionMutation(subscriptionToCancel._id, {
        onSuccess: () => {
          setIsShowCancelModal(false);
          setSubscriptionToCancel(null);
        },
      });
    }
  }, [cancelSubscriptionMutation, subscriptionToCancel]);

  const handleSubmitAssign = useCallback(
    (data: AssignPlanInput) => {
      assignPlanMutation(data, {
        onSuccess: () => {
          handleCloseAssignModal();
        },
      });
    },
    [assignPlanMutation, handleCloseAssignModal]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Subscriptions</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage school subscriptions and plans
          </p>
        </div>
        <Button
          onClick={handleAssignPlan}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Assign Plan
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Filter
          paramKey="status"
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "TRIAL", label: "Trial" },
            { value: "EXPIRED", label: "Expired" },
            { value: "CANCELLED", label: "Cancelled" },
          ]}
        />
      </div>

      {isSubscriptionsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {subscriptionsError && (
        <ErrorMessage
          message={subscriptionsError.message || "Failed to load subscriptions"}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isSubscriptionsLoading && !subscriptionsError && (
        <>
          {!subscriptions || subscriptions.length === 0 ? (
            <EmptyState
              icon={CreditCard}
              title="No Subscriptions Found"
              description="Get started by assigning a plan to a school."
              buttonText="Assign Plan"
              buttonIcon={Plus}
              onButtonClick={handleAssignPlan}
            />
          ) : (
            <>
              <SubscriptionsTable
                subscriptions={subscriptions}
                onCancel={handleCancel}
              />
              {pagination && (
                <Pagination
                  pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalStudents: pagination.totalSubscriptions,
                    hasNextPage: pagination.hasNextPage,
                    hasPrevPage: pagination.hasPrevPage,
                    limit: pagination.limit,
                  }}
                />
              )}
            </>
          )}
        </>
      )}

      {/* Assign Plan Modal */}
      <AssignPlanModal
        isOpen={isShowAssignModal}
        onClose={handleCloseAssignModal}
        onSubmit={handleSubmitAssign}
        isSubmitting={isAssigningPlan}
      />

      {/* Cancel Subscription Confirmation Modal */}
      <ConfirmationModal
        title="Cancel Subscription"
        message={
          subscriptionToCancel
            ? `Are you sure you want to cancel the subscription for "${subscriptionToCancel.schoolId && typeof subscriptionToCancel.schoolId === "object" ? subscriptionToCancel.schoolId.name : "this school"}"? This action cannot be undone and the school's plan will be set to FREE.`
            : "Are you sure you want to cancel this subscription?"
        }
        confirmText="Cancel Subscription"
        cancelText="Keep Active"
        type="warning"
        isOpen={isShowCancelModal}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
        isLoading={isCancellingSubscription}
      />
    </div>
  );
}

