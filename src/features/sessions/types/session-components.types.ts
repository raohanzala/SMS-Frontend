import { Session } from "./session.types";

export interface ManageSessionModalProps {
  isManageSessionModalOpen: boolean;
  onManageSessionModalClose: () => void;
  sessionToEdit: Session | null;
}

export interface CreateSessionFormProps {
  sessionToEdit: Session | null;
  onClose: () => void;
}

export interface SessionsTableProps {
  sessions: Session[];
  onEditSession: (sessionToEdit: Session) => void;
  onDeleteSession: (sessionId: string) => void;
  selectedSessions: Set<string>;
  onToggleSelect: (sessionId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export interface SessionsToolbarProps {
  onClickAddSession: () => void;
  selectedCount: number;
  onBulkDelete: () => void;
  onCancelSelection: () => void;
  isDeleting: boolean;
}

export interface SessionsCardsProps {
  sessions: Session[];
  onEditSession: (sessionToEdit: Session) => void;
  onDeleteSession: (sessionId: string) => void;
  selectedSessions: Set<string>;
  onToggleSelect: (sessionId: string) => void;
}

