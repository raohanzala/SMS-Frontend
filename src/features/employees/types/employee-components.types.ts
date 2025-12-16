import { Employee } from "./employee.types";

export interface EmployeesTableProps {
  employees: Employee[];
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
  selectedEmployees?: Set<string>;
  onToggleSelect?: (employeeId: string) => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export interface EmployeesToolbarProps {
  onClickAddEmployee: () => void;
}

