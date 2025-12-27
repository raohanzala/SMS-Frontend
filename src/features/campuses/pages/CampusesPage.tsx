import { useState, useCallback } from "react";
import { useCampuses } from "../hooks/useCampuses";
import { useCreateCampus } from "../hooks/useCreateCampus";
import { useUpdateCampus } from "../hooks/useUpdateCampus";
import { useDeleteCampus } from "../hooks/useDeleteCampus";
import { useSwitchCampus } from "../hooks/useSwitchCampus";
import CampusesTable from "../components/CampusesTable";
import CreateCampusForm from "../components/CreateCampusForm";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/common/Button";
import { Plus } from "lucide-react";
import { Campus, CreateCampusInput, UpdateCampusInput } from "../types/campus.types";
import { isMainCampus } from "../types/campus.types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const CampusesPage = () => {
  const [campusToEdit, setCampusToEdit] = useState<Campus | null>(null);
  const [campusToDelete, setCampusToDelete] = useState<string | null>(null);
  const [isShowCampusModal, setIsShowCampusModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const { campuses, isCampusesLoading, campusesError } = useCampuses();
  const { createCampusMutation, isCreatingCampus } = useCreateCampus();
  const { updateCampusMutation, isUpdatingCampus } = useUpdateCampus();
  const { deleteCampusMutation, isDeletingCampus } = useDeleteCampus();
  const { switchCampusMutation } = useSwitchCampus();

  const { campus: currentCampus } = useSelector((state: RootState) => state.auth);
  const currentCampusId = currentCampus?._id;

  const handleEditCampus = useCallback((campus: Campus) => {
    setCampusToEdit(campus);
    setIsShowCampusModal(true);
  }, []);

  const handleDeleteCampus = useCallback((campusId: string) => {
    setCampusToDelete(campusId);
    setIsShowDeleteModal(true);
  }, []);

  const handleSwitchCampus = useCallback((campusId: string) => {
    switchCampusMutation(campusId);
  }, [switchCampusMutation]);

  const handleShowCampusModal = useCallback(() => {
    setIsShowCampusModal(true);
  }, []);

  const handleCloseCampusModal = useCallback(() => {
    setCampusToEdit(null);
    setIsShowCampusModal(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setCampusToDelete(null);
    setIsShowDeleteModal(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (campusToDelete) {
      deleteCampusMutation(campusToDelete, {
        onSuccess: () => {
          setIsShowDeleteModal(false);
          setCampusToDelete(null);
        },
      });
    }
  }, [deleteCampusMutation, campusToDelete]);

  const handleSubmit = useCallback(
    (data: CreateCampusInput | UpdateCampusInput) => {
      if (campusToEdit) {
        updateCampusMutation(
          {
            campusId: campusToEdit._id,
            payload: data as UpdateCampusInput,
          },
          {
            onSuccess: () => {
              handleCloseCampusModal();
            },
          }
        );
      } else {
        createCampusMutation(data as CreateCampusInput, {
          onSuccess: () => {
            handleCloseCampusModal();
          },
        });
      }
    },
    [campusToEdit, updateCampusMutation, createCampusMutation, handleCloseCampusModal]
  );

  if (isCampusesLoading) {
    return <Spinner />;
  }

  const campusToDeleteObj = campuses.find((c) => c._id === campusToDelete);
  const isMain = campusToDeleteObj ? isMainCampus(campusToDeleteObj) : false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Campus Management</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your school campuses and switch between them
          </p>
        </div>
        <Button
          onClick={handleShowCampusModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Add New Campus
        </Button>
      </div>

      {campusesError ? (
        <ErrorMessage message={campusesError.message || "Failed to load campuses"} />
      ) : (
        <CampusesTable
          campuses={campuses}
          onEditCampus={handleEditCampus}
          onDeleteCampus={handleDeleteCampus}
          onSwitchCampus={handleSwitchCampus}
          currentCampusId={currentCampusId || undefined}
        />
      )}

      {/* Create/Edit Campus Modal */}
      {isShowCampusModal && (
        <CreateCampusForm
          campusToEdit={campusToEdit}
          onClose={handleCloseCampusModal}
          onSubmit={handleSubmit}
          isSubmitting={isCreatingCampus || isUpdatingCampus}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isShowDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Delete Campus"
        message={
          isMain
            ? "Cannot delete Main Campus. The main campus is required and cannot be removed."
            : campusToDeleteObj
            ? `Are you sure you want to delete "${campusToDeleteObj.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this campus?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        type={isMain ? "warning" : "danger"}
        confirmButtonVariant="danger"
        isLoading={isDeletingCampus}
      />
    </div>
  );
};

export default CampusesPage;

