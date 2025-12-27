import { FiTrash2, FiUsers } from "react-icons/fi";
import { StudentsToolbarProps } from "../types/student-components.types";
import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import ViewToggle from "@/components/common/ViewToggle";
import SearchBar from "@/components/common/SearchBar";
import { useAddDummyStudents } from "../hooks/useDummyStudents";
import { MdCancel } from "react-icons/md";

const StudentsToolbar = ({ onClickAddStudent, selectedCount, onBulkDelete, onCancelSelection, isDeleting }: StudentsToolbarProps) => {

  const { isAddingDummyStudents, addDummyStudentsMutation } = useAddDummyStudents();
  return (
    <PageToolbar>
      <SearchBar placeholder="Search students..." paramKey="student" />

      <div className="flex gap-5 items-center">
      {selectedCount > 0 && (
          <div className="flex items-center gap-3">

            <span className="text-sm text-gray-600">
              {selectedCount} selected
            </span>
            <Button
              onClick={onBulkDelete}
              variant="danger"
              loading={isDeleting}
              startIcon={<FiTrash2 className="mr-2 h-4 w-4" />}
            >
              Delete Selected
            </Button>
            <Button
              onClick={onCancelSelection}
              variant="outline"
              startIcon={<MdCancel className="mr-2 h-4 w-4" />}
            >
              Cancel
            </Button>
          </div>
        )}
        <ViewToggle />
        <Button
          onClick={onClickAddStudent}
          startIcon={<FiUsers className="mr-2 h-4 w-4" />}
        >
          Add Student
        </Button>

        <Button
          onClick={() => addDummyStudentsMutation()}
          startIcon={<FiUsers className="mr-2 h-4 w-4" />}
          loading={isAddingDummyStudents}
        >
          Add Dummy Students
        </Button>
      </div>
    </PageToolbar>
  );
};

export default StudentsToolbar;
