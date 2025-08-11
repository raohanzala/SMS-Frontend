import React, { useState } from 'react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { useDeleteSubject } from './useDeleteSubject';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { useSubjects } from './useSubjects';
import AddSubject from './AddSubject';
import Pagination from '../../components/common/Pagination';

function SubjectsTable({ isShowModal, setIsShowModal }) {

  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [subjectToEdit, setSubjectToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { subjects, isPending, error, pagination } = useSubjects();
  const { deleteSubject, isDeleting } = useDeleteSubject();

  const handleDelete = (id) => {
    setSubjectToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      deleteSubject(subjectToDelete, {
        onSuccess: () => {
          setIsDeleteModal(false);
          setSubjectToDelete(null);
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
            Subjects ({subjects?.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Teacher
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
              {subjects?.map((subject) => (
                <tr key={subject._id} className="hover:bg-gray-50">

                  {/* Subject Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.name}
                  </td>

                  {/* Code */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.code || '—'}
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subject.classId
                      ? `${subject.classId.name} (${subject.classId.section})`
                      : '—'}
                  </td>

                  {/* Assigned Teacher */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subject.assignedTeacher ? (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={subject.assignedTeacher.profileImage || '/default-avatar.png'}
                            alt={subject.assignedTeacher.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {subject.assignedTeacher.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {subject.assignedTeacher.email}
                          </div>
                        </div>
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subject.createdAt).toLocaleDateString()}
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
                          setSubjectToEdit(subject);
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(subject._id)}
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

      <AddSubject
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        subjectToEdit={subjectToEdit}
      />

      <ConfirmationModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </>
  )
}

export default SubjectsTable