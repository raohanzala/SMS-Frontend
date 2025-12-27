import { useState, useMemo } from "react";
import { useExams } from "../hooks/useExams";
import { useMarks } from "../hooks/useMarks";
import { useBulkCreateMarks } from "../hooks/useBulkCreateMarks";
import { useStudents } from "@/features/students/hooks/useStudents";
import MarksEntryTable from "../components/MarksEntryTable";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import { Calendar, BookOpen, Book, Users } from "lucide-react";
import { useAllSessions } from "@/features/students/hooks/useAllSessions";
import { BulkMarkEntry } from "../types/exam.types";
import EmptyState from "@/components/common/EmptyState";
import Card from "@/components/common/Card";

const TeacherMarksPage = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [totalMarks, setTotalMarks] = useState<number>(100);

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

  const { exams } = useExams(selectedSessionId);
  const { marks: existingMarks, isMarksLoading } = useMarks(
    selectedExamId,
    selectedClassId,
    selectedSubjectId,
    null
  );

  // Get students by class
  // Note: useStudents uses searchParams, so we need to filter manually
  // In a real scenario, you might want to create a separate hook for getting students by class
  const { students: allStudents } = useStudents();
  const classStudents = useMemo(() => {
    if (!selectedClassId || !allStudents) return [];
    return allStudents.filter((s) => {
      const studentClassId = typeof s.classId === "object" ? s.classId._id : s.classId;
      return studentClassId === selectedClassId;
    });
  }, [allStudents, selectedClassId]);

  const { bulkCreateMarksMutation, isBulkCreatingMarks } = useBulkCreateMarks();

  const handleSaveMarks = (marks: BulkMarkEntry[]) => {
    if (!selectedExamId || !selectedClassId || !selectedSubjectId) {
      return;
    }
    bulkCreateMarksMutation({
      examId: selectedExamId,
      classId: selectedClassId,
      subjectId: selectedSubjectId,
      marks,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Enter Marks</h1>

      {/* Filters */}
      <Card>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

            <FormRowVertical
              label="Exam"
              name="exam"
              icon={<BookOpen className="inline w-4 h-4" />}
            >
              <EntitySelect
                entity="static"
                staticOptions={exams.map((exam) => ({
                  value: exam._id,
                  label: exam.name,
                }))}
                value={selectedExamId}
                onChange={(value) =>
                  setSelectedExamId(Array.isArray(value) ? value[0] || null : value)
                }
                placeholder="Select exam"
                isDisabled={!selectedSessionId}
              />
            </FormRowVertical>

            <FormRowVertical
              label="Class"
              name="class"
              icon={<Users className="inline w-4 h-4" />}
            >
              <EntitySelect
                entity="class"
                value={selectedClassId}
                onChange={(value) =>
                  setSelectedClassId(Array.isArray(value) ? value[0] || null : value)
                }
                placeholder="Select class"
                isDisabled={!selectedExamId}
              />
            </FormRowVertical>

            <FormRowVertical
              label="Subject"
              name="subject"
              icon={<Book className="inline w-4 h-4" />}
            >
              <EntitySelect
                entity="subject"
                value={selectedSubjectId}
                onChange={(value) =>
                  setSelectedSubjectId(Array.isArray(value) ? value[0] || null : value)
                }
                placeholder="Select subject"
                isDisabled={!selectedClassId}
              />
            </FormRowVertical>

            <FormRowVertical
              label="Total Marks"
              name="totalMarks"
              icon={<BookOpen className="inline w-4 h-4" />}
            >
              <Input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(parseFloat(e.target.value) || 100)}
                min="1"
                step="1"
                disabled={!selectedSubjectId}
              />
            </FormRowVertical>
          </div>
        </div>
      </Card>

      {isMarksLoading ? (
        <Spinner />
      ) : selectedExamId && selectedClassId && selectedSubjectId ? (
        classStudents.length > 0 ? (
          <MarksEntryTable
            students={classStudents}
            existingMarks={existingMarks}
            totalMarks={totalMarks}
            onSave={handleSaveMarks}
            isSaving={isBulkCreatingMarks}
          />
        ) : (
          <EmptyState
            icon={Users}
            title="No students found"
            description="No students found in the selected class"
          />
        )
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Select filters"
          description="Please select Exam, Class, and Subject to enter marks"
        />
      )}
    </div>
  );
};

export default TeacherMarksPage;

