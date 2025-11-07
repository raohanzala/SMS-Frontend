import { Employee } from "./employee.types";

export interface EmployeesTableProps {
  employees: Employee[];
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
}

export interface EmployeesToolbarProps {
  onClickAddEmployee: () => void;
}

