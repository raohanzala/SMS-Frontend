import { Student } from "./student.types";

export interface CreateStudentFormProps {
  studentToEdit: Student | null;
  onManageStudentModalClose: () => void;
}

export interface ManageStudentModalProps {
  isManageStudentModalOpen: boolean;
  onManageStudentModalClose: () => void;
  studentToEdit: Student | null;
}

export interface StudentsCardsProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
}

export interface StudentsTableProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  selectedStudents?: Set<string>;
  onToggleSelect?: (studentId: string) => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export interface StudentsToolbarProps {
  onClickAddStudent: () => void;
}