import { Teacher } from "./teacher.types";

export interface CreateTeacherFormProps {
  teacherToEdit: Teacher | null;
  onManageTeacherModalClose: () => void;
}

export interface ManageTeacherModalProps {
  isManageTeacherModalOpen: boolean;
  onManageTeacherModalClose: () => void;
  teacherToEdit: Teacher | null;
}

export interface TeachersTableProps {
  teachers: Teacher[];
  onEditTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (teacherId: string) => void;
}

export interface TeachersToolbarProps {
  onClickAddTeacher: () => void;
}

