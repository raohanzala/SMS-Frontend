import React, { useEffect } from 'react';
import { useTimetable } from './useTimetable';

const TimetableList = ({ selectedClassId, setSelectedClassId }) => {
  // const { timetables, isPending } = useGetTimetables(selectedClassId);

  const { timetables, isPending } = useTimetable()

  if (isPending) return <p className="text-gray-500">Loading timetables...</p>;
  if (!timetables || timetables.length === 0)
    return <p className="text-gray-500">No timetables created yet.</p>;

  return (
    <div className="space-y-8">
      {timetables.map((table) => (
        <div key={table._id} className="border rounded-lg bg-white shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">
            {table.classId?.name} {table.classId?.section ? `(${table.classId.section})` : ''}
          </h3>

          {/* ✅ Timetable Grid */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-3 py-2 text-left">Day</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Periods</th>
                </tr>
              </thead>
              <tbody>
                {table.schedule.map((day, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 font-medium w-32">{day.day}</td>
                    <td className="border border-gray-200 px-3 py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {day.periods.map((p, j) => (
                          <div key={j} className="p-2 bg-gray-50 border rounded-md">
                            <p className="text-sm font-semibold">{p.subjectId?.name || 'Subject'}</p>
                            <p className="text-xs text-gray-600">{p.teacher?.name || 'Teacher'}</p>
                            <p className="text-xs">Room: {p.room}</p>
                            <p className="text-xs text-gray-500">{p.time}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimetableList;
