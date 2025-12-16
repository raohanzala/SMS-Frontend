import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeleteSession } from "../hooks/useDeleteSession";
import { useSessions } from "../hooks/useSessions";
import { Session } from "../types/session.types";
import { FiCalendar } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import ManageSessionModal from "../components/ManageSessionModal";
import SessionsTable from "../components/SessionsTable";
import SessionsCards from "../components/SessionsCards";
import SessionsToolbar from "../components/SessionsToolbar";
import { useSelectable } from "@/hooks/useSelectable";

const SessionsPage = () => {
  const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [isShowManageSessionModal, setIsShowManageSessionModal] = useState(false);
  const [isShowSessionDeleteModal, setIsShowSessionDeleteModal] = useState(false);
  const [isShowBulkDeleteModal, setIsShowBulkDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, sessions, sessionsError, isSessionsLoading } = useSessions();
  const { deleteSessionMutation, isDeletingSession } = useDeleteSession();

  const {
    selectedItems: selectedSessions,
    handleToggleSelect,
    handleSelectAll,
    handleDeselectAll,
    setSelectedItems
  } = useSelectable(sessions || []);

  const handleEditSession = useCallback((sessionToEdit: Session) => {
    setSessionToEdit(sessionToEdit);
    setIsShowManageSessionModal(true);
  }, []);

  const handleDeleteSession = useCallback((sessionId: string) => {
    setSessionToDelete(sessionId);
    setIsShowSessionDeleteModal(true);
  }, []);

  const handleShowManageSessionModal = useCallback(() => {
    setIsShowManageSessionModal(true);
  }, []);

  const handleCloseManageSessionModal = useCallback(() => {
    setSessionToEdit(null);
    setIsShowManageSessionModal(false);
  }, []);

  const handleCloseSessionDeleteModal = useCallback(() => {
    setSessionToDelete(null);
    setIsShowSessionDeleteModal(false);
  }, []);

  const handleConfirmSessionDelete = useCallback(() => {
    if (sessionToDelete) {
      deleteSessionMutation(sessionToDelete, {
        onSuccess: () => {
          setIsShowSessionDeleteModal(false);
          setSessionToDelete(null);
        },
      });
    }
  }, [deleteSessionMutation, sessionToDelete]);

  const handleBulkDelete = useCallback(() => {
    setIsShowBulkDeleteModal(true);
  }, []);

  const handleConfirmBulkDelete = useCallback(() => {
    if (selectedSessions.size > 0) {
      const sessionIds = Array.from(selectedSessions);
      // Delete sessions sequentially
      const deleteNext = (index: number) => {
        if (index >= sessionIds.length) {
          setIsShowBulkDeleteModal(false);
          setSelectedItems(new Set());
          return;
        }
        deleteSessionMutation(sessionIds[index], {
          onSuccess: () => {
            deleteNext(index + 1);
          },
        });
      };
      deleteNext(0);
    }
  }, [deleteSessionMutation, selectedSessions, setSelectedItems]);

  const handleCloseBulkDeleteModal = useCallback(() => {
    setIsShowBulkDeleteModal(false);
  }, []);

  return (
    <div className="space-y-6">
      <SessionsToolbar 
        onClickAddSession={handleShowManageSessionModal}
        selectedCount={selectedSessions.size}
        onBulkDelete={handleBulkDelete}
        onCancelSelection={() => setSelectedItems(new Set())}
        isDeleting={isDeletingSession}
      />

      {isSessionsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {sessionsError && (
        <ErrorMessage
          message={sessionsError.message || "Failed to load sessions"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isSessionsLoading && !sessionsError && (
        <>
          {sessions?.length === 0 ? (
            <EmptyState
              icon={FiCalendar}
              title="No Sessions Found"
              description="Get started by adding your first session to the system."
              buttonText="Add Session"
              buttonIcon={FiCalendar}
              onButtonClick={handleShowManageSessionModal}
            />
          ) : (
            <>
              {view === "table" ? (
                <SessionsTable
                  sessions={sessions}
                  onEditSession={handleEditSession}
                  onDeleteSession={handleDeleteSession}
                  selectedSessions={selectedSessions}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                />
              ) : (
                <SessionsCards
                  sessions={sessions}
                  onEditSession={handleEditSession}
                  onDeleteSession={handleDeleteSession}
                  selectedSessions={selectedSessions}
                  onToggleSelect={handleToggleSelect}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ManageSessionModal
        isManageSessionModalOpen={isShowManageSessionModal}
        onManageSessionModalClose={handleCloseManageSessionModal}
        sessionToEdit={sessionToEdit}
      />

      <ConfirmationModal
        title="Delete Session"
        message="Are you sure you want to delete this session? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowSessionDeleteModal}
        onClose={handleCloseSessionDeleteModal}
        onConfirm={handleConfirmSessionDelete}
        isLoading={isDeletingSession}
      />

      <ConfirmationModal
        title="Delete Selected Sessions"
        message={`Are you sure you want to delete ${selectedSessions.size} selected session(s)? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowBulkDeleteModal}
        onClose={handleCloseBulkDeleteModal}
        onConfirm={handleConfirmBulkDelete}
        isLoading={isDeletingSession}
      />
    </div>
  );
};

export default SessionsPage;

