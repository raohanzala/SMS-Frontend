import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import TimetableList from '../../../features/timetable/TimetableList'; // new component to show created timetables
import CreateTimetableForm from '../../../features/timetable/CreateTimetableForm';

const AdminTimetable = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Timetable Management</h1>
        <p className="text-gray-600">
          Create class-wise timetables and manage schedules visually.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ✅ Timetable Creation Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FiCalendar className="mr-2 text-blue-600" />
            Create / Edit Timetable
          </h2>
          <CreateTimetableForm />
        </div>

        {/* ✅ Existing Timetables */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FiCalendar className="mr-2 text-green-600" />
            Existing Timetables
          </h2>
          <TimetableList selectedClassId={selectedClassId} setSelectedClassId={setSelectedClassId} />
        </div>
      </div>
    </div>
  );
};

export default AdminTimetable;
