import { Parent } from "./parent.types";

export interface CreateParentFormProps {
  parentToEdit?: Parent | null;
  onClose?: () => void;
  onSuccess?: (parent: Parent) => void;
  context?: "parent" | "student";
}

export interface ManageParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentToEdit?: Parent | null;
}

// ParentDetailsProps is intentionally empty as the component doesn't accept props
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ParentDetailsProps {}

export interface ParentsTableProps {
  parents: Parent[];
  onEditParent: (parent: Parent) => void;
  onDeleteParent: (parentId: string) => void;
}

export interface ParentsToolbarProps {
  onClickAddParent: () => void;
}

