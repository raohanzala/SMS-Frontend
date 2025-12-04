import { Class } from "./class.types";

export interface ManageClassModalProps {
  isManageClassModalOpen: boolean;
  onManageClassModalClose: () => void;
  classToEdit: Class | null;
}

export interface CreateClassFormProps {
  classToEdit: Class | null;
  onClose: () => void;
}

export interface ClassesTableProps {
  classes: Class[];
  onEditClass: (classToEdit: Class) => void;
  onDeleteClass: (classId: string) => void;
  selectedClasses: Set<string>;
  onToggleSelect: (classId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export interface ClassesToolbarProps {
  onClickAddClass: () => void;
  selectedCount: number;
  onBulkDelete: () => void;
  isDeleting: boolean;
}

export interface ClassesCardsProps {
  classes: Class[];
  onEditClass: (classToEdit: Class) => void;
  onDeleteClass: (classId: string) => void;
  selectedClasses: Set<string>;
  onToggleSelect: (classId: string) => void;
}