import { PromotionStudent } from "./promotion.types";

export interface FilterPanelProps {
  sourceSessionId: string | null;
  selectedClassIds: string[];
  onSourceSessionChange: (sessionId: string | null) => void;
  onClassesChange: (classIds: string[]) => void;
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
  sourceClassIds: string[];
  sourceSessionId: string | null;
  targetSessionId: string | null;
  targetClassIds: string[];
  useAutoPromotion: boolean;
  onTargetSessionChange: (sessionId: string | null) => void;
  onTargetClassesChange: (classIds: string[]) => void;
  onUseAutoPromotionChange: (useAuto: boolean) => void;
  onPromote: () => void;
  isPromoting?: boolean;
  disabled?: boolean;
}
