import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import { FiBook, FiTrash2 } from "react-icons/fi";
import ViewToggle from "@/components/common/ViewToggle";
import SearchBar from "@/components/common/SearchBar";
import { ClassesToolbarProps } from "../types/class-components.interface";

const ClassesToolbar = ({ 
  onClickAddClass, 
  selectedCount, 
  onBulkDelete, 
  isDeleting 
}: ClassesToolbarProps) => {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search classes..." paramKey="search" />

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
          </div>
        )}
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

