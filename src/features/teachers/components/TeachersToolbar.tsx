import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import { FiUser } from "react-icons/fi";
import ViewToggle from "@/components/common/ViewToggle";
import SearchBar from "@/components/common/SearchBar";
import { TeachersToolbarProps } from "../types/teacher-components.types";

const TeachersToolbar = ({ onClickAddTeacher }: TeachersToolbarProps) => {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search teachers..." paramKey="search" />

      <div className="flex gap-5 items-center">
        <ViewToggle />
        <Button
          onClick={onClickAddTeacher}
          startIcon={<FiUser className="mr-2 h-4 w-4" />}
        >
          Add Teacher
        </Button>
      </div>
    </PageToolbar>
  );
};

export default TeachersToolbar;

