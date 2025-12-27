import { useState, useCallback } from "react";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import { useApproveLeaveRequest } from "../hooks/useApproveLeaveRequest";
import { useRejectLeaveRequest } from "../hooks/useRejectLeaveRequest";
import LeaveRequestsTable from "../components/LeaveRequestsTable";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { Calendar, User } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import ConfirmationModal from "@/components/common/ConfirmationModal";

const AdminLeavesPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [leaveRequestToReject, setLeaveRequestToReject] = useState<string | null>(null);

  const { leaveRequests, isLeaveRequestsLoading, leaveRequestsError } = useLeaveRequests(
    selectedUserId,
    selectedStatus
  );
  const { approveLeaveRequestMutation, isApprovingLeaveRequest } = useApproveLeaveRequest();
  const { rejectLeaveRequestMutation, isRejectingLeaveRequest } = useRejectLeaveRequest();

  const handleApprove = useCallback(
    (id: string) => {
      approveLeaveRequestMutation(id);
    },
    [approveLeaveRequestMutation]
  );

  const handleReject = useCallback((id: string) => {
    setLeaveRequestToReject(id);
    setIsShowRejectModal(true);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setLeaveRequestToReject(null);
    setIsShowRejectModal(false);
  }, []);

  const handleConfirmReject = useCallback(() => {
    if (leaveRequestToReject) {
      rejectLeaveRequestMutation(leaveRequestToReject, {
        onSuccess: () => {
          handleCloseRejectModal();
        },
      });
    }
  }, [leaveRequestToReject, rejectLeaveRequestMutation, handleCloseRejectModal]);

  if (isLeaveRequestsLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Leave Requests</h1>
          <p className="text-sm text-text-secondary mt-1">
            Approve or reject leave requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormRowVertical
            label="User"
            name="user"
            icon={<User className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="static"
              staticOptions={[]}
              value={selectedUserId}
              onChange={(value) =>
                setSelectedUserId(Array.isArray(value) ? value[0] || null : value)
              }
              placeholder="All Users"
            />
          </FormRowVertical>

          <FormRowVertical
            label="Status"
            name="status"
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <select
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className="block w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary bg-bg-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </FormRowVertical>
        </div>
      </div>

      {leaveRequestsError ? (
        <ErrorMessage message={leaveRequestsError.message || "Failed to load leave requests"} />
      ) : leaveRequests.length > 0 ? (
        <LeaveRequestsTable
          leaveRequests={leaveRequests}
          onApprove={handleApprove}
          onReject={handleReject}
          canApprove={true}
          isApproving={isApprovingLeaveRequest}
          isRejecting={isRejectingLeaveRequest}
        />
      ) : (
        <EmptyState
          icon={Calendar}
          title="No leave requests found"
          description="No leave requests found for the selected filters"
        />
      )}

      {/* Reject Confirmation Modal */}
      {isShowRejectModal && (
        <ConfirmationModal
          isOpen={isShowRejectModal}
          onClose={handleCloseRejectModal}
          title="Reject Leave Request"
          message="Are you sure you want to reject this leave request? This action cannot be undone."
          confirmText="Reject"
          cancelText="Cancel"
          onConfirm={handleConfirmReject}
          type="danger"
          confirmButtonVariant="danger"
        />
      )}
    </div>
  );
};

export default AdminLeavesPage;

