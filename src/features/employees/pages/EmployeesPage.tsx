import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import EmptyState from "../../../components/common/EmptyState";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Pagination from "../../../components/common/Pagination";
import Spinner from "../../../components/common/Spinner";
import EmployeesTable from "../components/EmployeesTable";
import EmployeesCards from "../components/EmployeesCards";
import EmployeesToolbar from "../components/EmployeesToolbar";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";
import { useEmployees } from "../hooks/useEmployees";
import { Employee } from "../types/employee.types";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [isShowEmployeeDeleteModal, setIsShowEmployeeDeleteModal] = useState(false);

  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "table";
  const { pagination, employees, employeesError, isEmployeesLoading } = useEmployees();
  const { deleteEmployeeMutation, isDeletingEmployee } = useDeleteEmployee();

  const handleEditEmployee = useCallback((employee: Employee) => {
    navigate(`/admin/employees/${employee._id}/edit`);
  }, [navigate]);

  const handleDeleteEmployee = useCallback((employeeId: string) => {
    setEmployeeToDelete(employeeId);
    setIsShowEmployeeDeleteModal(true);
  }, []);

  const handleShowAddEmployee = useCallback(() => {
    navigate("/admin/employees/new");
  }, [navigate]);

  const handleCloseEmployeeDeleteModal = useCallback(() => {
    setEmployeeToDelete(null);
    setIsShowEmployeeDeleteModal(false);
  }, []);

  const handleConfirmEmployeeDelete = useCallback(() => {
    if (employeeToDelete) {
      deleteEmployeeMutation(employeeToDelete, {
        onSuccess: () => {
          setIsShowEmployeeDeleteModal(false);
          setEmployeeToDelete(null);
        },
      });
    }
  }, [deleteEmployeeMutation, employeeToDelete]);

  return (
    <div className="space-y-6">
      <EmployeesToolbar onClickAddEmployee={handleShowAddEmployee} />

      {isEmployeesLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {employeesError && (
        <ErrorMessage
          message={employeesError.message || "Failed to load employees"}
          onRetry={() => window.location.reload()}
        />
      )}
      {!isEmployeesLoading && !employeesError && (
        <>
          {employees?.length === 0 ? (
            <EmptyState
              icon={FiUser}
              title="No Employees Found"
              description="Get started by adding your first employee to the system."
              buttonText="Add Employee"
              buttonIcon={FiUser}
              onButtonClick={handleShowAddEmployee}
            />
          ) : (
            <>
              {view === "table" ? (
                <EmployeesTable
                  employees={employees}
                  onEditEmployee={handleEditEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              ) : (
                <EmployeesCards
                  employees={employees}
                  onEditEmployee={handleEditEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              )}

              <Pagination pagination={pagination} />
            </>
          )}
        </>
      )}

      <ConfirmationModal
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isOpen={isShowEmployeeDeleteModal}
        onClose={handleCloseEmployeeDeleteModal}
        onConfirm={handleConfirmEmployeeDelete}
        isLoading={isDeletingEmployee}
      />
    </div>
  );
};

export default EmployeesPage;

