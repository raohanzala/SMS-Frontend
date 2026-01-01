import { useState, useCallback } from "react";
import { Building2, Plus } from "lucide-react";
import { useSchools } from "../hooks/useSchools";
import { useCreateSchool } from "../hooks/useCreateSchool";
import { useUpdateSchool } from "../hooks/useUpdateSchool";
import { useToggleSchoolStatus } from "../hooks/useToggleSchoolStatus";
import SchoolsTable from "../components/SchoolsTable";
import SchoolForm from "../components/SchoolForm";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import SearchBar from "@/components/common/SearchBar";
import Filter from "@/components/common/Filter";
import { School, CreateSchoolInput, UpdateSchoolInput } from "../types/schools.types";

export default function SchoolsPage() {
  const [schoolToEdit, setSchoolToEdit] = useState<School | null>(null);
  const [schoolToToggle, setSchoolToToggle] = useState<School | null>(null);
  const [isShowSchoolModal, setIsShowSchoolModal] = useState(false);
  const [isShowToggleModal, setIsShowToggleModal] = useState(false);

  const { schools, pagination, isSchoolsLoading, schoolsError } = useSchools();
  const { createSchoolMutation, isCreatingSchool } = useCreateSchool();
  const { updateSchoolMutation, isUpdatingSchool } = useUpdateSchool();
  const { toggleSchoolStatusMutation, isTogglingStatus } = useToggleSchoolStatus();

  const handleEditSchool = useCallback((school: School) => {
    setSchoolToEdit(school);
    setIsShowSchoolModal(true);
  }, []);

  const handleToggleStatus = useCallback((school: School) => {
    setSchoolToToggle(school);
    setIsShowToggleModal(true);
  }, []);

  const handleShowSchoolModal = useCallback(() => {
    setSchoolToEdit(null);
    setIsShowSchoolModal(true);
  }, []);

  const handleCloseSchoolModal = useCallback(() => {
    setSchoolToEdit(null);
    setIsShowSchoolModal(false);
  }, []);

  const handleCloseToggleModal = useCallback(() => {
    setSchoolToToggle(null);
    setIsShowToggleModal(false);
  }, []);

  const handleConfirmToggleStatus = useCallback(() => {
    if (schoolToToggle) {
      toggleSchoolStatusMutation(
        {
          schoolId: schoolToToggle._id,
          isActive: !schoolToToggle.isActive,
        },
        {
          onSuccess: () => {
            setIsShowToggleModal(false);
            setSchoolToToggle(null);
          },
        }
      );
    }
  }, [toggleSchoolStatusMutation, schoolToToggle]);

  const handleSubmit = useCallback(
    (data: CreateSchoolInput | UpdateSchoolInput) => {
      if (schoolToEdit) {
        updateSchoolMutation(
          {
            schoolId: schoolToEdit._id,
            data: data as UpdateSchoolInput,
          },
          {
            onSuccess: () => {
              handleCloseSchoolModal();
            },
          }
        );
      } else {
        createSchoolMutation(data as CreateSchoolInput, {
          onSuccess: () => {
            handleCloseSchoolModal();
          },
        });
      }
    },
    [schoolToEdit, updateSchoolMutation, createSchoolMutation, handleCloseSchoolModal]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Schools Management</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage all schools in the system
          </p>
        </div>
        <Button
          onClick={handleShowSchoolModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Create School
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar placeholder="Search schools by name or code..." />
        </div>
        <Filter
          paramKey="isActive"
          options={[
            { value: "true", label: "Active" },
            { value: "false", label: "Suspended" },
          ]}
        />
      </div>

      {isSchoolsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {schoolsError && (
        <ErrorMessage
          message={schoolsError.message || "Failed to load schools"}
          onRetry={() => window.location.reload()}
        />
      )}

      {!isSchoolsLoading && !schoolsError && (
        <>
          {!schools || schools.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No Schools Found"
              description="Get started by creating your first school."
              buttonText="Create School"
              buttonIcon={Plus}
              onButtonClick={handleShowSchoolModal}
            />
          ) : (
            <>
              <SchoolsTable
                schools={schools}
                onEditSchool={handleEditSchool}
                onToggleStatus={handleToggleStatus}
              />
              {pagination && (
                <Pagination
                  pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalStudents: pagination.totalSchools,
                    hasNextPage: pagination.hasNextPage,
                    hasPrevPage: pagination.hasPrevPage,
                    limit: pagination.limit,
                  }}
                />
              )}
            </>
          )}
        </>
      )}

      {/* Create/Edit School Modal */}
      {isShowSchoolModal && (
        <SchoolForm
          schoolToEdit={schoolToEdit}
          onClose={handleCloseSchoolModal}
          onSubmit={handleSubmit}
          isSubmitting={isCreatingSchool || isUpdatingSchool}
        />
      )}

      {/* Toggle Status Confirmation Modal */}
      <ConfirmationModal
        title={schoolToToggle?.isActive ? "Suspend School" : "Activate School"}
        message={
          schoolToToggle?.isActive
            ? `Are you sure you want to suspend "${schoolToToggle.name}"? This will suspend all users in the school.`
            : `Are you sure you want to activate "${schoolToToggle?.name}"?`
        }
        confirmText={schoolToToggle?.isActive ? "Suspend" : "Activate"}
        cancelText="Cancel"
        type={schoolToToggle?.isActive ? "warning" : "default"}
        isOpen={isShowToggleModal}
        onClose={handleCloseToggleModal}
        onConfirm={handleConfirmToggleStatus}
        isLoading={isTogglingStatus}
      />
    </div>
  );
}

