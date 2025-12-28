import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiCalendar } from "react-icons/fi";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import WeeklyTimetableGrid from "../components/WeeklyTimetableGrid";
import { useStudentTimetable } from "../hooks/useStudentTimetable";
import { getStudentByIdApi } from "@/api/students";
import { useQuery } from "@tanstack/react-query";
import EntitySelect from "../../../components/common/EntitySelect";
import { RootState } from "@/store/store";

const StudentTimetablePage = () => {
  const { studentId: paramStudentId } = useParams<{ studentId?: string }>();
  const {user} = useSelector((state: RootState) => state.auth);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    paramStudentId || null
  );

  // For students, they can only view their own timetable
  // For parents, they can view their children's timetables
  // For admins/teachers, they can view any student's timetable
  useEffect(() => {
    if (user?.role === "student") {
      setSelectedStudentId(user?.profile?._id);
    }
  }, [user]);

  // Fetch student details if studentId is provided
  const { data: studentData } = useQuery({
    queryKey: ["student", selectedStudentId],
    queryFn: () => getStudentByIdApi(selectedStudentId!),
    enabled: !!selectedStudentId && user?.role !== "student",
  });

  const { studentTimetable, isStudentTimetableLoading, studentTimetableError } =
    useStudentTimetable(selectedStudentId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Timetable</h1>
          <p className="text-gray-600 mt-1">
            {user?.role === "student"
              ? "View your weekly timetable"
              : user?.role === "parent"
              ? "View your child's weekly timetable"
              : "View the weekly timetable for a student"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {user?.role === "parent" && !paramStudentId && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Child
            </label>
            <EntitySelect
              entity="student"
              value={selectedStudentId}
              onChange={(studentId: string | null) =>
                setSelectedStudentId(studentId)
              }
              placeholder="Select a child to view their timetable"
            />
          </div>
        )}

        {/* {isStudentTimetableLoading && (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        )} */}

        {studentTimetableError && (
          <ErrorMessage
            message={
              studentTimetableError.message || "Failed to load student timetable"
            }
            onRetry={() => window.location.reload()}
          />
        )}

        {!isStudentTimetableLoading &&
          !studentTimetableError &&
          studentTimetable && (
            <div className="mt-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {studentTimetable.student?.name}
                  {studentTimetable.student?.rollNumber &&
                    ` (${studentTimetable.student.rollNumber})`}
                  {" - "}
                  {studentTimetable.class?.name} Timetable
                </h2>
              </div>
              <WeeklyTimetableGrid
                timetable={studentTimetable.timetable}
                title=""
              />
            </div>
          )}

        {!isStudentTimetableLoading &&
          !studentTimetableError &&
          !studentTimetable &&
          selectedStudentId && (
            <div className="text-center py-12 text-gray-500">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No timetable entries found for this student.</p>
            </div>
          )}

        {!isStudentTimetableLoading &&
          !studentTimetableError &&
          !selectedStudentId && (
            <div className="text-center py-12 text-gray-500">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>
                {user?.role === "student"
                  ? "Unable to load your timetable."
                  : "Please select a student to view their timetable."}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default StudentTimetablePage;

