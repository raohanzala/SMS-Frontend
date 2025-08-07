import React from 'react';
import { FiBarChart2, FiFileText, FiDownload } from 'react-icons/fi';

const AdminResults = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Results Management</h1>
          <p className="text-gray-600">Upload marks, calculate grades, and generate report cards</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <FiBarChart2 className="mr-2 h-4 w-4" />
          Generate Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Results Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload marks, calculate grades, and generate comprehensive report cards.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              <FiBarChart2 className="mr-2 h-4 w-4" />
              Manage Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResults; 