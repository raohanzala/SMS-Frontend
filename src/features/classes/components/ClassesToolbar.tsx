import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import { FiBook } from "react-icons/fi";
import ViewToggle from "@/components/common/ViewToggle";
import SearchBar from "@/components/common/SearchBar";
import { ClassesToolbarProps } from "../types/class-components.interface";

const ClassesToolbar = ({ onClickAddClass }: ClassesToolbarProps) => {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search classes..." paramKey="search" />

      <div className="flex gap-5 items-center">
        <ViewToggle />
        <Button
          onClick={onClickAddClass}
          startIcon={<FiBook className="mr-2 h-4 w-4" />}
        >
          Add Class
        </Button>
      </div>
    </PageToolbar>
  );
};

export default ClassesToolbar;

