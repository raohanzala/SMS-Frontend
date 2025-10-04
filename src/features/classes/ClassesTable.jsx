import React, { useState } from 'react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
// import AddStudent from './AddStudent';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { useClasses } from './useClasses';
import { useDeleteClass } from './useDeleteClass';
import AddClass from './AddClass';
import Pagination from '@/components/common/Pagination';

function ClassesTable({ isShowModal, setIsShowModal }) {

  const [classToDelete, setClassToDelete] = useState(null);
  const [classToEdit, setClassToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { classes, isPending, error, pagination } = useClasses();
  const { deleteClass, isDeleting } = useDeleteClass();

  const handleDelete = (id) => {
    setClassToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (classToDelete) {
      deleteClass(classToDelete, {
        onSuccess: () => {
          setIsDeleteModal(false);
          setClassToDelete(null);
        },
      });
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
            Classes ({classes?.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Teachers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {classes?.map((classItem) => (
                <tr key={classItem._id} className="hover:bg-gray-50">
                  {/* Class Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {classItem.name}
                  </td>

                  {/* Section */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {classItem.section}
                  </td>

                  {/* Subjects */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.subjects?.length > 0
                      ? classItem.subjects.map((sub) => sub.name).join(', ')
                      : '—'}
                  </td>

                  {/* Assigned Teachers */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.assignedTeachers?.length > 0 ? (
                      <div className="flex flex-col space-y-1">
                        {classItem.assignedTeachers.map((teacher) => (
                          <div key={teacher._id} className="flex items-center space-x-2">
                            {teacher.profileImage ? (
                              <img
                                src={teacher.profileImage}
                                alt={teacher.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                                {teacher.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="flex flex-col leading-tight">
                              <span className="text-gray-900">{teacher.name}</span>
                              {teacher.email && (
                                <span className="text-gray-400 text-xs">{teacher.email}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(classItem.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsShowModal(true);
                          setClassToEdit(classItem);
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(classItem._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination pagination={pagination} />
        </div>
      </div>

      <AddClass
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        classToEdit={classToEdit}
      />

      <ConfirmationModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </>
  )
}

export default ClassesTable