import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import { FiBookOpen } from "react-icons/fi";
import SearchBar from "@/components/common/SearchBar";
import { SubjectsToolbarProps } from "../types/subject-components.types";

const SubjectsToolbar = ({ onClickAddSubject }: SubjectsToolbarProps) => {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search subjects..." paramKey="subject" />

      <div className="flex gap-5 items-center">
        <Button
          onClick={onClickAddSubject}
          startIcon={<FiBookOpen className="mr-2 h-4 w-4" />}
        >
          Add Subject
        </Button>
      </div>
    </PageToolbar>
  );
};

export default SubjectsToolbar;

