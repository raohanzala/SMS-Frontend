import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMarks } from "../hooks/useMarks";
import { useExams } from "../hooks/useExams";
import { useStudents } from "@/features/students/hooks/useStudents";
import ResultsTable from "../components/ResultsTable";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { Calendar, BookOpen } from "lucide-react";
import { useAllSessions } from "@/features/students/hooks/useAllSessions";
import EmptyState from "@/components/common/EmptyState";
import Card from "@/components/common/Card";
import { BarChart2 } from "lucide-react";

const ParentResultsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const parentId = user?.profile as string;

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  const { sessions } = useAllSessions();
  const { students } = useStudents({ parentId });

  // Filter students by parent
  const parentStudents = useMemo(() => {
    if (!students) return [];
    return students;
  }, [students]);

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

  // Set default student to first child
  useMemo(() => {
    if (parentStudents.length > 0 && !selectedStudentId) {
      setSelectedStudentId(parentStudents[0]._id);
    }
  }, [parentStudents, selectedStudentId]);

  const { exams } = useExams(selectedSessionId);
  const { marks, isMarksLoading, marksError } = useMarks(
    selectedExamId,
    null,
    null,
    selectedStudentId
  );

  // Calculate statistics
  const statistics = useMemo(() => {
    if (marks.length === 0) return null;

    const totalSubjects = marks.length;
    const totalObtained = marks.reduce((sum, m) => sum + m.obtainedMarks, 0);
    const totalMarks = marks.reduce((sum, m) => sum + m.totalMarks, 0);
    const averagePercentage = totalMarks > 0
      ? ((totalObtained / totalMarks) * 100).toFixed(2)
      : "0.00";
    const passed = marks.filter((m) => {
      const percentage = m.totalMarks > 0 ? (m.obtainedMarks / m.totalMarks) * 100 : 0;
      return percentage >= 50;
    }).length;
    const failed = totalSubjects - passed;

    return {
      totalSubjects,
      totalObtained,
      totalMarks,
      averagePercentage,
      passed,
      failed,
    };
  }, [marks]);

  if (isMarksLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Results</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {parentStudents.length > 1 && (
            <FormRowVertical
              label="Student"
              name="student"
              icon={<Calendar className="inline w-4 h-4" />}
            >
              <EntitySelect
                entity="student"
                value={selectedStudentId}
                onChange={(value) =>
                  setSelectedStudentId(Array.isArray(value) ? value[0] || null : value)
                }
                placeholder="Select student"
              />
            </FormRowVertical>
          )}

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
              placeholder="Select exam (optional)"
              isDisabled={!selectedSessionId}
            />
          </FormRowVertical>
        </div>
      </div>

      {marksError ? (
        <ErrorMessage message={marksError.message || "Failed to load results"} />
      ) : !selectedStudentId ? (
        <EmptyState
          icon={BarChart2}
          title="Select a student"
          description="Please select a student to view their results"
        />
      ) : marks.length > 0 ? (
        <>
          {/* Statistics */}
          {statistics && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Overall Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-text-primary">{statistics.totalSubjects}</div>
                    <div className="text-sm text-text-secondary mt-1">Subjects</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{statistics.passed}</div>
                    <div className="text-sm text-text-secondary mt-1">Passed</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{statistics.failed}</div>
                    <div className="text-sm text-text-secondary mt-1">Failed</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{statistics.averagePercentage}%</div>
                    <div className="text-sm text-text-secondary mt-1">Average</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-text-secondary">Total Marks</div>
                  <div className="text-lg font-bold text-text-primary">
                    {statistics.totalObtained} / {statistics.totalMarks}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <ResultsTable marks={marks} />
        </>
      ) : (
        <EmptyState
          icon={BarChart2}
          title="No results found"
          description="No results found for the selected student and filters"
        />
      )}
    </div>
  );
};

export default ParentResultsPage;

