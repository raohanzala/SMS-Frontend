import { useState, useMemo, useCallback } from "react";
import { useExams } from "../hooks/useExams";
import { useCreateExam } from "../hooks/useCreateExam";
import { useUpdateExam } from "../hooks/useUpdateExam";
import { useDeleteExam } from "../hooks/useDeleteExam";
import ExamsTable from "../components/ExamsTable";
import ExamForm from "../components/ExamForm";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import { Plus } from "lucide-react";
import { Exam, CreateExamInput, UpdateExamInput } from "../types/exam.types";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { Calendar } from "lucide-react";
import { useAllSessions } from "@/features/students/hooks/useAllSessions";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import EmptyState from "@/components/common/EmptyState";
import { BookOpen } from "lucide-react";

const AdminExamsPage = () => {
  const [examToEdit, setExamToEdit] = useState<Exam | null>(null);
  const [isShowExamModal, setIsShowExamModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const { sessions } = useAllSessions();

  // Get active session or first session as default
  const activeSession = useMemo(() => {
    if (sessions && sessions.length > 0) {
      const active = sessions.find((s) => s.isActive);
      return active || sessions[0];
    }
    return null;
  }, [sessions]);

  useMemo(() => {
    if (activeSession && !selectedSessionId) {
      setSelectedSessionId(activeSession._id);
    }
  }, [activeSession, selectedSessionId]);

  const { exams, isExamsLoading, examsError } = useExams(selectedSessionId);
  const { createExamMutation, isCreatingExam } = useCreateExam();
  const { updateExamMutation, isUpdatingExam } = useUpdateExam();
  const { deleteExamMutation, isDeletingExam } = useDeleteExam();

  const handleEditExam = useCallback((exam: Exam) => {
    setExamToEdit(exam);
    setIsShowExamModal(true);
  }, []);

  const handleDeleteExam = useCallback((id: string) => {
    setExamToDelete(id);
    setIsShowDeleteModal(true);
  }, []);

  const handleShowExamModal = useCallback(() => {
    setExamToEdit(null);
    setIsShowExamModal(true);
  }, []);

  const handleCloseExamModal = useCallback(() => {
    setExamToEdit(null);
    setIsShowExamModal(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setExamToDelete(null);
    setIsShowDeleteModal(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (examToDelete) {
      deleteExamMutation(examToDelete, {
        onSuccess: () => {
          setIsShowDeleteModal(false);
          setExamToDelete(null);
        },
      });
    }
  }, [examToDelete, deleteExamMutation]);

  const handleSubmit = useCallback(
    (data: CreateExamInput | UpdateExamInput) => {
      if (examToEdit) {
        updateExamMutation(
          {
            id: examToEdit._id,
            payload: data as UpdateExamInput,
          },
          {
            onSuccess: () => {
              handleCloseExamModal();
            },
          }
        );
      } else {
        createExamMutation(data as CreateExamInput, {
          onSuccess: () => {
            handleCloseExamModal();
          },
        });
      }
    },
    [examToEdit, updateExamMutation, createExamMutation, handleCloseExamModal]
  );

  if (isExamsLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Exams</h1>
          <p className="text-sm text-text-secondary mt-1">
            Create and manage exams
          </p>
        </div>
        <Button
          onClick={handleShowExamModal}
          startIcon={<Plus className="h-4 w-4" />}
        >
          Create Exam
        </Button>
      </div>

      {/* Session Filter */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <FormRowVertical
          label="Session"
          name="session"
          icon={<Calendar className="inline w-4 h-4" />}
        >
          <EntitySelect
            entity="session"
            value={selectedSessionId}
            onChange={(value) =>
              setSelectedSessionId(Array.isArray(value) ? value[0] || null : value)
            }
            placeholder="Select session"
          />
        </FormRowVertical>
      </div>

      {examsError ? (
        <ErrorMessage message={examsError.message || "Failed to load exams"} />
      ) : exams.length > 0 ? (
        <ExamsTable
          exams={exams}
          onEditExam={handleEditExam}
          onDeleteExam={handleDeleteExam}
          isDeleting={isDeletingExam}
        />
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No exams found"
          description="Create an exam to get started"
        />
      )}

      {/* Create/Edit Exam Modal */}
      {isShowExamModal && (
        <ExamForm
          examToEdit={examToEdit}
          selectedSessionId={selectedSessionId}
          onClose={handleCloseExamModal}
          onSubmit={handleSubmit}
          isSubmitting={isCreatingExam || isUpdatingExam}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isShowDeleteModal && (
        <ConfirmationModal
          isOpen={isShowDeleteModal}
          onClose={handleCloseDeleteModal}
          title="Delete Exam"
          message="Are you sure you want to delete this exam? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          type="danger"
          confirmButtonVariant="danger"
        />
      )}
    </div>
  );
};

export default AdminExamsPage;

