import React, { useState } from 'react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { useDeleteSubject } from './useDeleteSubject';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { useSubjects } from './useSubjects';
import AddSubject from './AddSubject';

function SubjectsTable({ isShowModal, setIsShowModal }) {

  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [subjectToEdit, setSubjectToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { subjects, subjectData, isPending, error, pagination } = useSubjects();
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Teachers
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjectData?.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={subject.avatar}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {subject.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subject.rollNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subject.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subject.email}</div>
                    <div className="text-sm text-gray-500">{subject.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(subject.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subject.admissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => { setIsShowModal(true); setSubjectToEdit(subject) }} className="text-green-600 hover:text-green-900">
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(subject._id)} className="text-red-600 hover:text-red-900">
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