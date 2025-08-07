import React from 'react';
import { FiClipboard, FiCheckCircle, FiUsers } from 'react-icons/fi';
import AttendanceTable from '../../../features/attendance/AttendanceTable';

const AdminAttendance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
        <p className="text-gray-600">View and manage daily attendance reports</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <FiClipboard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Attendance Reports</h3>
          <p className="mt-1 text-sm text-gray-500">
            View attendance reports, generate statistics, and manage attendance records.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <FiClipboard className="mr-2 h-4 w-4" />
              View Reports
            </button>
          </div>
        </div>
      </div>

      <AttendanceTable />
    </div>
  );
};

export default AdminAttendance; 