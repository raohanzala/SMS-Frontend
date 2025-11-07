import { Parent } from "./parent.types";

export interface CreateParentFormProps {
  parentToEdit?: Parent | null;
  onManageParentModalClose?: () => void;
  onParentFormSuccess?: (parent: Parent) => void;
  parentFormContext?: "parent" | "student";
}

export interface ManageParentModalProps {
  isManageParentModalOpen: boolean;
  onManageParentModalClose: () => void;
  parentToEdit?: Parent | null;
  parentFormContext?: "parent" | "student";
  onParentFormSuccess?: (parent: Parent) => void;
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

export interface ParentsCardsProps {
  parents: Parent[];
  onEditParent: (parent: Parent) => void;
  onDeleteParent: (parentId: string) => void;
}

