import { useState, useCallback } from "react";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import { useCreateLeaveRequest } from "../hooks/useCreateLeaveRequest";
import LeaveRequestsTable from "../components/LeaveRequestsTable";
import LeaveRequestForm from "../components/LeaveRequestForm";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import { Plus, Calendar } from "lucide-react";
import { CreateLeaveRequestInput } from "../types/leave.types";
import EmptyState from "@/components/common/EmptyState";
import Card from "@/components/common/Card";

const UserLeaveRequestPage = () => {
  const [isShowLeaveRequestModal, setIsShowLeaveRequestModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Get current user's leave requests (userId will be null to get own requests)
  const { leaveRequests, isLeaveRequestsLoading, leaveRequestsError } = useLeaveRequests(
    null,
    selectedStatus
  );
  const { createLeaveRequestMutation, isCreatingLeaveRequest } = useCreateLeaveRequest();

  const handleShowLeaveRequestModal = useCallback(() => {
    setIsShowLeaveRequestModal(true);
  }, []);

  const handleCloseLeaveRequestModal = useCallback(() => {
    setIsShowLeaveRequestModal(false);
  }, []);

  const handleSubmit = useCallback(
    (data: CreateLeaveRequestInput) => {
      createLeaveRequestMutation(data, {
        onSuccess: () => {
          handleCloseLeaveRequestModal();
        },
      });
    },
    [createLeaveRequestMutation, handleCloseLeaveRequestModal]
  );

  if (isLeaveRequestsLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Leave Requests</h1>
          <p className="text-sm text-text-secondary mt-1">
            Request and manage your leave
          </p>
        </div>
        <Button
          onClick={handleShowLeaveRequestModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Request Leave
        </Button>
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-text-primary flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Status:
          </label>
          <select
            value={selectedStatus || ""}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
            className="block px-4 py-2 border border-border rounded-lg text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {leaveRequestsError ? (
        <ErrorMessage message={leaveRequestsError.message || "Failed to load leave requests"} />
      ) : leaveRequests.length > 0 ? (
        <LeaveRequestsTable
          leaveRequests={leaveRequests}
          canApprove={false}
        />
      ) : (
        <EmptyState
          icon={Calendar}
          title="No leave requests found"
          description="Create a leave request to get started"
        />
      )}

      {/* Create Leave Request Modal */}
      {isShowLeaveRequestModal && (
        <LeaveRequestForm
          onClose={handleCloseLeaveRequestModal}
          onSubmit={handleSubmit}
          isSubmitting={isCreatingLeaveRequest}
        />
      )}
    </div>
  );
};

export default UserLeaveRequestPage;

