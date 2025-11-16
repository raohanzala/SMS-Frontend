import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import { FiCalendar } from "react-icons/fi";
import { TimetableToolbarProps } from "../types/timetable-components.types";

const TimetableToolbar = ({ onClickAddTimetable }: TimetableToolbarProps) => {
  return (
    <PageToolbar>
      <div className="flex gap-5 items-center">
        <Button
          onClick={onClickAddTimetable}
          startIcon={<FiCalendar className="mr-2 h-4 w-4" />}
        >
          Add Timetable Entry
        </Button>
      </div>
    </PageToolbar>
  );
};

export default TimetableToolbar;

