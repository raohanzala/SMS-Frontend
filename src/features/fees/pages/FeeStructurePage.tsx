import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFeeStructure } from "../hooks/useFeeStructure";
import { useCreateFeeStructure } from "../hooks/useCreateFeeStructure";
import { useUpdateFeeStructure } from "../hooks/useUpdateFeeStructure";
import { useToggleFeeStructure } from "../hooks/useToggleFeeStructure";
import FeeStructureTable from "../components/FeeStructureTable";
import FeeStructureForm from "../components/FeeStructureForm";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import { Plus } from "lucide-react";
import { FeeStructure, CreateFeeStructureInput, UpdateFeeStructureInput } from "../types/fee.types";
import CampusClassFilter from "../components/CampusClassFilter";
import EmptyState from "@/components/common/EmptyState";
import { Building2 } from "lucide-react";

const FeeStructurePage = () => {
  const [feeStructureToEdit, setFeeStructureToEdit] = useState<FeeStructure | null>(null);
  const [isShowFeeStructureModal, setIsShowFeeStructureModal] = useState(false);
  const [selectedCampusId, setSelectedCampusId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const { campus: currentCampus } = useSelector((state: RootState) => state.auth);

  // Set default campus to current campus
  useMemo(() => {
    if (currentCampus?._id && !selectedCampusId) {
      setSelectedCampusId(currentCampus._id);
    }
  }, [currentCampus, selectedCampusId]);

  const { feeStructures, isFeeStructureLoading, feeStructureError } = useFeeStructure(selectedClassId);
  const { createFeeStructureMutation, isCreatingFeeStructure } = useCreateFeeStructure();
  const { updateFeeStructureMutation, isUpdatingFeeStructure } = useUpdateFeeStructure();
  const { toggleFeeStructureMutation, isTogglingFeeStructure } = useToggleFeeStructure();

  const handleEditFeeStructure = useCallback((feeStructure: FeeStructure) => {
    setFeeStructureToEdit(feeStructure);
    setIsShowFeeStructureModal(true);
  }, []);

  const handleToggleFeeStructure = useCallback((id: string) => {
    toggleFeeStructureMutation(id);
  }, [toggleFeeStructureMutation]);

  const handleShowFeeStructureModal = useCallback(() => {
    setFeeStructureToEdit(null);
    setIsShowFeeStructureModal(true);
  }, []);

  const handleCloseFeeStructureModal = useCallback(() => {
    setFeeStructureToEdit(null);
    setIsShowFeeStructureModal(false);
  }, []);

  const handleSubmit = useCallback(
    (data: CreateFeeStructureInput | UpdateFeeStructureInput) => {
      if (feeStructureToEdit) {
        updateFeeStructureMutation(
          {
            id: feeStructureToEdit._id,
            payload: data as UpdateFeeStructureInput,
          },
          {
            onSuccess: () => {
              handleCloseFeeStructureModal();
            },
          }
        );
      } else {
        createFeeStructureMutation(data as CreateFeeStructureInput, {
          onSuccess: () => {
            handleCloseFeeStructureModal();
          },
        });
      }
    },
    [feeStructureToEdit, updateFeeStructureMutation, createFeeStructureMutation, handleCloseFeeStructureModal]
  );

  // Filter fee structures by campus
  const filteredFeeStructures = useMemo(() => {
    if (!selectedCampusId) return [];
    return feeStructures.filter((fs) => {
      const campusId = typeof fs.campusId === "string" ? fs.campusId : fs.campusId;
      return campusId === selectedCampusId;
    });
  }, [feeStructures, selectedCampusId]);

  if (isFeeStructureLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fee Structure</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage fee structures for classes
          </p>
        </div>
        <Button
          onClick={handleShowFeeStructureModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Create Fee Structure
        </Button>
      </div>

      <CampusClassFilter
        selectedCampusId={selectedCampusId}
        selectedClassId={selectedClassId}
        onCampusChange={setSelectedCampusId}
        onClassChange={setSelectedClassId}
      />

      {feeStructureError ? (
        <ErrorMessage message={feeStructureError.message || "Failed to load fee structures"} />
      ) : selectedCampusId ? (
        <>
          {filteredFeeStructures.length > 0 ? (
            <FeeStructureTable
              feeStructures={filteredFeeStructures}
              onEditFeeStructure={handleEditFeeStructure}
              onToggleFeeStructure={handleToggleFeeStructure}
              isToggling={isTogglingFeeStructure}
            />
          ) : (
            <EmptyState
              icon={Building2}
              title="No fee structures found"
              description="Create a fee structure for a class to get started"
            />
          )}
        </>
      ) : (
        <EmptyState
          icon={Building2}
          title="Please select a campus"
          description="Select a campus to view fee structures"
        />
      )}

      {/* Create/Edit Fee Structure Modal */}
      {isShowFeeStructureModal && (
        <FeeStructureForm
          feeStructureToEdit={feeStructureToEdit}
          selectedCampusId={selectedCampusId}
          onClose={handleCloseFeeStructureModal}
          onSubmit={handleSubmit}
          isSubmitting={isCreatingFeeStructure || isUpdatingFeeStructure}
        />
      )}
    </div>
  );
};

export default FeeStructurePage;

