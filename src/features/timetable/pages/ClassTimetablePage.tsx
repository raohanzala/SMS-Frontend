import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import WeeklyTimetableGrid from "../components/WeeklyTimetableGrid";
import { useClassTimetable } from "../hooks/useClassTimetable";
import EntitySelect from "../../../components/common/EntitySelect";

const ClassTimetablePage = () => {
  const { classId: paramClassId } = useParams<{ classId?: string }>();
  const [selectedClassId, setSelectedClassId] = useState<string | null>(
    paramClassId || null
  );

  const { classTimetable, isClassTimetableLoading, classTimetableError } =
    useClassTimetable(selectedClassId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Timetable</h1>
          <p className="text-gray-600 mt-1">
            View the weekly timetable for a class
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <EntitySelect
            entity="class"
            value={selectedClassId}
            onChange={(classId: string | null) => setSelectedClassId(classId)}
            placeholder="Select a class to view timetable"
          />
        </div>

        {isClassTimetableLoading && (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        )}

        {classTimetableError && (
          <ErrorMessage
            message={
              classTimetableError.message || "Failed to load class timetable"
            }
            onRetry={() => window.location.reload()}
          />
        )}

        {!isClassTimetableLoading &&
          !classTimetableError &&
          classTimetable && (
            <div className="mt-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {classTimetable.class?.name} - Weekly Timetable
                </h2>
              </div>
              <WeeklyTimetableGrid
              periodConfig={classTimetable.periodConfig}
                timetable={classTimetable.timetable}
                title=""
              />
            </div>
          )}

        {!isClassTimetableLoading &&
          !classTimetableError &&
          !classTimetable &&
          selectedClassId && (
            <div className="text-center py-12 text-gray-500">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No timetable entries found for this class.</p>
            </div>
          )}

        {!selectedClassId && (
          <div className="text-center py-12 text-gray-500">
            <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Please select a class to view its timetable.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassTimetablePage;

