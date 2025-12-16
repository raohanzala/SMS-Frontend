import { Timetable, TimetableEntry } from "./timetable.types";

export interface TimetableToolbarProps {
  onClickAddTimetable: () => void;
}

export interface TimetableTableProps {
  timetables: Timetable[];
  onEditTimetable: (timetable: Timetable) => void;
  onDeleteTimetable: (timetableId: string) => void;
  selectedTimetables?: Set<string>;
  onToggleSelect?: (timetableId: string) => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
} 

export interface ManageTimetableModalProps {
  isManageTimetableModalOpen: boolean;
  onManageTimetableModalClose: () => void;
  timetableToEdit: Timetable | null;
}

export interface CreateTimetableFormProps {
  timetableToEdit: Timetable | null;
  onClose: () => void;
}

export interface WeeklyTimetableGridProps {
  timetable: {
    Mon: TimetableEntry[];
    Tue: TimetableEntry[];
    Wed: TimetableEntry[];
    Thu: TimetableEntry[];
    Fri: TimetableEntry[];
    Sat: TimetableEntry[];
  };
  title?: string;
  showActions?: boolean;
  onEdit?: (timetable: TimetableEntry) => void;
  onDelete?: (timetableId: string) => void;
}

