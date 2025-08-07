import React from 'react';
import { FiFileText, FiCalendar, FiBarChart2 } from 'react-icons/fi';

const AdminExams = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exams Management</h1>
          <p className="text-gray-600">Create exams, assign subjects, and set schedules</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
          <FiFileText className="mr-2 h-4 w-4" />
          Create Exam
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Exams Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create exams, assign subjects, set schedules, and manage exam results.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              <FiFileText className="mr-2 h-4 w-4" />
              Schedule Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExams; 