import React, { useState } from 'react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { useAttendance } from './useAttendance';
import AddAttendance from './AddAttendance';
import { useClassesAttendance } from './useClassesAttendance';

function AttendanceTable({ isShowModal, setIsShowModal }) {

  const [classToDelete, setClassToDelete] = useState(null);
  const [classToEdit, setClassToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { classes } = useClassesAttendance()

  const { attendance, isPending } = useAttendance()

  const handleDelete = (id) => {
    setClassToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (classToDelete) {
      // deleteClass(classToDelete, {
      //   onSuccess: () => {
      //     setIsDeleteModal(false);
      //     setClassToDelete(null);
      //   },
      // });
    }
  }


  const getStatusBadge = (status) => {
    return status === "active" ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Inactive
      </span>
    );
  };


  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Attendance ({attendance?.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance?.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={student.avatar}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.rollNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                    <div className="text-sm text-gray-500">{student.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.admissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => { setIsShowModal(true); setClassToEdit(student) }} className="text-green-600 hover:text-green-900">
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(student._id)} className="text-red-600 hover:text-red-900">
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <ConfirmationModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      /> */}

      <AddAttendance isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        classToEdit={classToEdit} />
    </>
  )
}

export default AttendanceTable