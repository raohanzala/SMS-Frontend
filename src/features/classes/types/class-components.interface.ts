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
}

export interface ClassesToolbarProps {
  onClickAddClass: () => void;
}

export interface ClassesCardsProps {
  classes: Class[];
  onEditClass: (classToEdit: Class) => void;
  onDeleteClass: (classId: string) => void;
}