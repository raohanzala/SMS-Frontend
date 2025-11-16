import { TimetableEntry } from "./timetable.types";

export interface TimetableToolbarProps {
  onClickAddTimetable: () => void;
}

export interface TimetableTableProps {
  timetables: TimetableEntry[];
  onEditTimetable: (timetable: TimetableEntry) => void;
  onDeleteTimetable: (timetableId: string) => void;
}

export interface ManageTimetableModalProps {
  isManageTimetableModalOpen: boolean;
  onManageTimetableModalClose: () => void;
  timetableToEdit: TimetableEntry | null;
}

export interface CreateTimetableFormProps {
  timetableToEdit: TimetableEntry | null;
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

