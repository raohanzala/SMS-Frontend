import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiCalendar, FiClock } from "react-icons/fi";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import WeeklyTimetableGrid from "../components/WeeklyTimetableGrid";
import { useTeacherTimetable } from "../hooks/useTeacherTimetable";
import EntitySelect from "../../../components/common/EntitySelect";

const TeacherTimetablePage = () => {
  const { teacherId: paramTeacherId } = useParams<{ teacherId?: string }>();
  const user = useSelector((state: any) => state.auth.user);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    paramTeacherId || null
  );

  // Auto-load teacher's own timetable if they're logged in as a teacher
  useEffect(() => {
    if (user?.role === "teacher" && user?.userRef && !paramTeacherId) {
      setSelectedTeacherId(user.userRef);
    }
  }, [user, paramTeacherId]);

  const {
    teacherTimetable,
    isTeacherTimetableLoading,
    teacherTimetableError,
  } = useTeacherTimetable(selectedTeacherId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Timetable</h1>
          <p className="text-gray-600 mt-1">
            View the weekly timetable for a teacher
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {user?.role !== "teacher" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Teacher
            </label>
            <EntitySelect
              entity="teacher"
              value={selectedTeacherId}
              onChange={(teacherId: string | null) =>
                setSelectedTeacherId(teacherId)
              }
              placeholder="Select a teacher to view timetable"
            />
          </div>
        )}

        {isTeacherTimetableLoading && (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        )}

        {teacherTimetableError && (
          <ErrorMessage
            message={
              teacherTimetableError.message || "Failed to load teacher timetable"
            }
            onRetry={() => window.location.reload()}
          />
        )}

        {!isTeacherTimetableLoading &&
          !teacherTimetableError &&
          teacherTimetable && (
            <>
              <div className="mt-6 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {teacherTimetable.teacher?.name} - Weekly Timetable
                </h2>
              </div>

              <WeeklyTimetableGrid
                timetable={teacherTimetable.timetable}
                title=""
              />

              {/* Free Periods Section */}
              {teacherTimetable.freePeriods && (
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                    <FiClock className="mr-2" />
                    Free Periods
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(teacherTimetable.freePeriods).map(
                      ([day, periods]) => {
                        if (periods.length === 0) return null;
                        return (
                          <div key={day} className="bg-white rounded p-3">
                            <div className="font-medium text-sm text-gray-700 mb-1">
                              {day}
                            </div>
                            <div className="text-xs text-gray-600">
                              Periods: {periods.join(", ")}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {/* Substitute Classes Section */}
              {teacherTimetable.substituteClasses &&
                teacherTimetable.substituteClasses.length > 0 && (
                  <div className="mt-6 bg-orange-50 rounded-lg p-6">
                    <h3 className="text-md font-semibold text-gray-900 mb-4">
                      Substitute Classes ({teacherTimetable.substituteClasses.length})
                    </h3>
                    <div className="space-y-2">
                      {teacherTimetable.substituteClasses.map((entry) => (
                        <div
                          key={entry._id}
                          className="bg-white rounded p-3 text-sm"
                        >
                          <div className="font-medium text-gray-900">
                            {typeof entry.class === "object"
                              ? entry.class.name
                              : entry.class}{" "}
                            - {entry.subject}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {entry.day}, Period {entry.period} ({entry.startTime} - {entry.endTime})
                            {entry.room && ` - Room: ${entry.room}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </>
          )}

        {!isTeacherTimetableLoading &&
          !teacherTimetableError &&
          !teacherTimetable &&
          selectedTeacherId && (
            <div className="text-center py-12 text-gray-500">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No timetable entries found for this teacher.</p>
            </div>
          )}

        {!selectedTeacherId && user?.role !== "teacher" && (
          <div className="text-center py-12 text-gray-500">
            <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Please select a teacher to view their timetable.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherTimetablePage;

