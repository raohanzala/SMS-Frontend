import React from 'react';
import { FiDollarSign, FiFileText, FiDownload } from 'react-icons/fi';

const AdminFees = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fees Management</h1>
          <p className="text-gray-600">Generate invoices, track fee status, and manage payments</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
          <FiFileText className="mr-2 h-4 w-4" />
          Generate Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <FiDollarSign className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Fees Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Generate invoices, track payments, and manage fee collection.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <FiDollarSign className="mr-2 h-4 w-4" />
              Manage Fees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFees; 