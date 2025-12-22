import { FiUsers } from "react-icons/fi";
import { StudentsToolbarProps } from "../types/student-components.types";
import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import ViewToggle from "@/components/common/ViewToggle";
import SearchBar from "@/components/common/SearchBar";

const StudentsToolbar = ({ onClickAddStudent }: StudentsToolbarProps) => {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search students..." paramKey="student" />

      <div className="flex gap-5 items-center">
        <ViewToggle />
        <Button
          onClick={onClickAddStudent}
          startIcon={<FiUsers className="mr-2 h-4 w-4" />}
        >
          Add Student
        </Button>
      </div>
    </PageToolbar>
  );
};

export default StudentsToolbar;
