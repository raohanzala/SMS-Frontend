import React from 'react';
import { FiBell, FiPlus, FiMessageSquare } from 'react-icons/fi';

const AdminNoticeboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Noticeboard</h1>
          <p className="text-gray-600">Post notices to students, parents, and teachers</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
          <FiPlus className="mr-2 h-4 w-4" />
          Post Notice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <FiBell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Noticeboard Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Post announcements, notices, and important information for the school community.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
              <FiBell className="mr-2 h-4 w-4" />
              Create Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNoticeboard; 