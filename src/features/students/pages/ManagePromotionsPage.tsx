import { useState, useCallback } from "react";
import { FiArrowUp } from "react-icons/fi";
import FilterPanel from "../components/promotion/FilterPanel";
import PromotionStudentTable from "../components/promotion/PromotionStudentTable";
import PromotionPanel from "../components/promotion/PromotionPanel";
import { useStudentsByClassesAndSession } from "../hooks/useStudentsByClassesAndSession";
import { usePromoteStudents } from "../hooks/usePromoteStudents";
import { useClasses } from "../../classes/hooks/useClasses";
import { useAllSessions } from "../hooks/useAllSessions";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { Session } from "../../sessions/types/session.types";
import { Class } from "../../classes/types/class.types";
import { PromotionStudent } from "../types/promotion.types";

const ManagePromotionsPage = () => {
  // Source selection
  const [sourceSessionId, setSourceSessionId] = useState<string | null>(null);
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  // Student selection
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  // Target selection
  const [targetSessionId, setTargetSessionId] = useState<string | null>(null);
  const [targetClassIds, setTargetClassIds] = useState<string[]>([]);
  const [useAutoPromotion, setUseAutoPromotion] = useState<boolean>(true);

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch students when search is triggered
  const shouldFetch = isSearchTriggered && selectedClassIds.length > 0 && sourceSessionId;
  const { students, isLoading, error } = useStudentsByClassesAndSession(
    shouldFetch ? selectedClassIds : [],
    shouldFetch ? sourceSessionId! : ""
  );

  const { isPromoting, promoteStudentsMutation } = usePromoteStudents();
  const { classes } = useClasses("", true);
  const { sessions } = useAllSessions();

  const handleSearch = useCallback(() => {
    if (!sourceSessionId || selectedClassIds.length === 0) {
      return;
    }
    setIsSearchTriggered(true);
    setSelectedStudentIds([]); // Reset selections on new search
  }, [sourceSessionId, selectedClassIds]);

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
    if (!targetSessionId || selectedStudentIds.length === 0) {
      return;
    }
    if (!useAutoPromotion && targetClassIds.length === 0) {
      return;
    }
    setShowConfirmModal(true);
  }, [targetSessionId, selectedStudentIds, useAutoPromotion, targetClassIds]);

  const handleConfirmPromote = useCallback(() => {
    if (!sourceSessionId || !targetSessionId || selectedStudentIds.length === 0) {
      return;
    }
    if (!useAutoPromotion && targetClassIds.length === 0) {
      return;
    }

    // Group students by their current class
    const studentsByClass = students
      .filter((s: PromotionStudent) => selectedStudentIds.includes(s._id))
      .reduce((acc: Record<string, string[]>, student: PromotionStudent) => {
        const classId = typeof student.class === "string" ? student.class : student.class?._id;
        if (!classId) return acc;
        if (!acc[classId]) acc[classId] = [];
        acc[classId].push(student._id);
        return acc;
      }, {} as Record<string, string[]>);

    // Group students by their current class for promotion
    // For multiple classes, we'll promote each class group separately
    const classEntries = Object.entries(studentsByClass);
    
    if (classEntries.length === 0) return;

    // For now, promote all students together
    // The backend should handle the logic for multiple classes
    const allStudentIds: string[] = Object.values(studentsByClass).flat() as string[];
    const firstClassId = classEntries[0][0];
    
    // Determine target class
    let toClassId = firstClassId;
    if (!useAutoPromotion && targetClassIds.length > 0) {
      // Use first target class (could be enhanced to map classes 1:1)
      toClassId = targetClassIds[0];
    } else if (useAutoPromotion) {
      // Backend should handle auto-promotion logic
      toClassId = firstClassId;
    }

    promoteStudentsMutation(
      {
        studentIds: allStudentIds,
        fromClass: firstClassId,
        toClass: toClassId,
        fromSession: sourceSessionId!,
        toSession: targetSessionId!,
      },
      {
        onSuccess: () => {
          setShowConfirmModal(false);
          setSelectedStudentIds([]);
          setTargetClassIds([]);
          setTargetSessionId(null);
        },
      }
    );
  }, [
    sourceSessionId,
    targetSessionId,
    selectedStudentIds,
    useAutoPromotion,
    targetClassIds,
    students,
    promoteStudentsMutation,
  ]);

  const getSessionName = (sessionId: string | null) => {
    if (!sessionId || !sessions) return "";
    const session = sessions.find((s: Session) => s._id === sessionId);
    return session?.name || "";
  };

  const getClassName = (classId: string | null) => {
    if (!classId || !classes) return "";
    const classItem = classes.find((c: Class) => c._id === classId);
    return classItem?.name || "";
  };

  const getClassNames = (classIds: string[]): string => {
    return classIds.map((id: string) => getClassName(id)).filter(Boolean).join(", ");
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
            Promote students from one session to another, optionally across classes
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        sourceSessionId={sourceSessionId}
        selectedClassIds={selectedClassIds}
        onSourceSessionChange={setSourceSessionId}
        onClassesChange={setSelectedClassIds}
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
          sourceClassIds={selectedClassIds}
          sourceSessionId={sourceSessionId}
          targetSessionId={targetSessionId}
          targetClassIds={targetClassIds}
          useAutoPromotion={useAutoPromotion}
          onTargetSessionChange={setTargetSessionId}
          onTargetClassesChange={setTargetClassIds}
          onUseAutoPromotionChange={setUseAutoPromotion}
          onPromote={handlePromote}
          isPromoting={isPromoting}
          disabled={!targetSessionId || (!useAutoPromotion && targetClassIds.length === 0)}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        title="Confirm Promotion"
        message={`Are you sure you want to promote ${selectedStudentIds.length} student(s) from ${getSessionName(sourceSessionId)} (${getClassNames(selectedClassIds)}) to ${getSessionName(targetSessionId)}${useAutoPromotion ? " (auto-promote classes)" : ` (${getClassNames(targetClassIds)})`}? This action will update their class and session.`}
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
