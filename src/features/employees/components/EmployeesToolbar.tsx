import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import { FiUser } from "react-icons/fi";
import ViewToggle from "@/components/common/ViewToggle";
import SearchBar from "@/components/common/SearchBar";
import { EmployeesToolbarProps } from "../types/employee-components.types";

const EmployeesToolbar = ({ onClickAddEmployee }: EmployeesToolbarProps) => {
  return (
    <PageToolbar>
      <SearchBar placeholder="Search employees..." paramKey="search" />

      <div className="flex gap-5 items-center">
        <ViewToggle />
        <Button
          onClick={onClickAddEmployee}
          startIcon={<FiUser className="mr-2 h-4 w-4" />}
        >
          Add Employee
        </Button>
      </div>
    </PageToolbar>
  );
};

export default EmployeesToolbar;

