import { PromotionStudent } from "./promotion.types";

export interface FilterPanelProps {
  selectedClassId: string | null;
  selectedSession: string;
  onClassChange: (classId: string | null) => void;
  onSessionChange: (session: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export interface PromotionStudentTableProps {
  students: PromotionStudent[];
  selectedStudentIds: string[];
  onSelectStudent: (studentId: string) => void;
  onSelectAll: () => void;
  isLoading?: boolean;
}

export interface PromotionPanelProps {
  selectedStudentIds: string[];
  fromClassId: string | null;
  fromSession: string;
  toClassId: string | null;
  toSession: string;
  onToClassChange: (classId: string | null) => void;
  onToSessionChange: (session: string) => void;
  onPromote: () => void;
  isPromoting?: boolean;
  disabled?: boolean;
}

