import { Subject } from "./subject.types";

export interface CreateSubjectFormProps {
  subjectToEdit: Subject | null;
  onManageSubjectModalClose: () => void;
}

export interface ManageSubjectModalProps {
  isManageSubjectModalOpen: boolean;
  onManageSubjectModalClose: () => void;
  subjectToEdit: Subject | null;
}

export interface SubjectsTableProps {
  subjects: Subject[];
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
}

export interface SubjectsCardsProps {
  subjects: Subject[];
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
}

export interface SubjectsToolbarProps {
  onClickAddSubject: () => void;
}

