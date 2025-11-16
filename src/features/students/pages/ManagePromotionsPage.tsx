import { useState, useCallback } from "react";
import { FiUsers, FiArrowUp } from "react-icons/fi";
import FilterPanel from "../components/promotion/FilterPanel";
import PromotionStudentTable from "../components/promotion/PromotionStudentTable";
import PromotionPanel from "../components/promotion/PromotionPanel";
import { useStudentsByClassAndSession } from "../hooks/useStudentsByClassAndSession";
import { usePromoteStudents } from "../hooks/usePromoteStudents";
import { useClasses } from "../../classes/hooks/useClasses";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import ErrorMessage from "../../../components/common/ErrorMessage";

const ManagePromotionsPage = () => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [toClassId, setToClassId] = useState<string | null>(null);
  const [toSession, setToSession] = useState<string>("");
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Only fetch students when search is triggered
  const shouldFetch = isSearchTriggered && selectedClassId && selectedSession;
  const { students, isLoading, error } = useStudentsByClassAndSession(
    shouldFetch ? selectedClassId : null,
    shouldFetch ? selectedSession : ""
  );

  const { isPromoting, promoteStudentsMutation } = usePromoteStudents();
  const { classes } = useClasses("", true);

  const handleSearch = useCallback(() => {
    if (!selectedClassId || !selectedSession) {
      return;
    }
    setIsSearchTriggered(true);
    setSelectedStudentIds([]); // Reset selections on new search
  }, [selectedClassId, selectedSession]);

  const handleSelectStudent = useCallback((studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedStudentIds.length === students.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(students.map((s) => s._id));
    }
  }, [students, selectedStudentIds.length]);

  const handlePromote = useCallback(() => {
    if (!toClassId || !toSession || selectedStudentIds.length === 0) {
      return;
    }
    setShowConfirmModal(true);
  }, [toClassId, toSession, selectedStudentIds]);

  const handleConfirmPromote = useCallback(() => {
    if (!selectedClassId || !toClassId || !selectedSession || !toSession) {
      return;
    }

    promoteStudentsMutation(
      {
        studentIds: selectedStudentIds,
        fromClass: selectedClassId,
        toClass: toClassId,
        fromSession: selectedSession,
        toSession: toSession,
      },
      {
        onSuccess: () => {
          setShowConfirmModal(false);
          setSelectedStudentIds([]);
          setToClassId(null);
          setToSession("");
          // Optionally reset search
          // setIsSearchTriggered(false);
        },
      }
    );
  }, [
    selectedClassId,
    toClassId,
    selectedSession,
    toSession,
    selectedStudentIds,
    promoteStudentsMutation,
  ]);

  const getClassName = (classId: string | null) => {
    if (!classId || !classes) return "";
    const classItem = classes.find((c) => c._id === classId);
    return classItem?.name || "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiArrowUp className="text-indigo-600" />
            Manage Promotions
          </h1>
          <p className="text-gray-600 mt-1">
            Promote students from one class and session to another
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        selectedClassId={selectedClassId}
        selectedSession={selectedSession}
        onClassChange={setSelectedClassId}
        onSessionChange={setSelectedSession}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Error Message */}
      {error && (
        <ErrorMessage
          message={error.message || "Failed to load students"}
          onRetry={handleSearch}
        />
      )}

      {/* Student Table */}
      {isSearchTriggered && (
        <PromotionStudentTable
          students={students}
          selectedStudentIds={selectedStudentIds}
          onSelectStudent={handleSelectStudent}
          onSelectAll={handleSelectAll}
          isLoading={isLoading}
        />
      )}

      {/* Promotion Panel */}
      {isSearchTriggered && selectedStudentIds.length > 0 && (
        <PromotionPanel
          selectedStudentIds={selectedStudentIds}
          fromClassId={selectedClassId}
          fromSession={selectedSession}
          toClassId={toClassId}
          toSession={toSession}
          onToClassChange={setToClassId}
          onToSessionChange={setToSession}
          onPromote={handlePromote}
          isPromoting={isPromoting}
          disabled={!toClassId || !toSession}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        title="Confirm Promotion"
        message={`Are you sure you want to promote ${selectedStudentIds.length} student(s) from ${getClassName(selectedClassId)} (${selectedSession}) to ${getClassName(toClassId)} (${toSession})? This action will update their class and session.`}
        confirmText="Promote"
        cancelText="Cancel"
        type="success"
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPromote}
        isLoading={isPromoting}
      />
    </div>
  );
};

export default ManagePromotionsPage;

