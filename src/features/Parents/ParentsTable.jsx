import React, { useState } from 'react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { useParents } from './useParents';
import { useDeleteParent } from './useDeleteParent';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import AddParent from './AddParent';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';

function ParentsTable({ isShowModal, setIsShowModal }) {

  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const navigate = useNavigate()

  const { pagination, parents } = useParents()
  const { deleteParent, isDeleting } = useDeleteParent();

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      deleteParent(studentToDelete, {
        onSuccess: () => {
          setIsDeleteModal(false);
          setStudentToDelete(null);
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
            Parents ({parents?.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Children
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parents?.map((parent) => (
                <tr key={parent._id} className="hover:bg-gray-50">
                  {/* Parent info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={parent.profileImage || "/default-avatar.png"}
                          alt={parent.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {parent.name}
                        </div>
                        <div className="text-sm text-gray-500">{parent.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Children */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parent.children?.length > 0 ? (
                      <div className="text-sm text-gray-900">
                        {parent.children.map((child) => child.name).join(", ")}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No children</span>
                    )}
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parent.phone ? (
                      <>
                        <div className="text-sm text-gray-900">{parent.phone}</div>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No phone</span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(parent.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => navigate(`/admin/parents/${parent._id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => { setIsShowModal(true); setStudentToEdit(parent); }}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(parent._id)}
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

      <AddParent
        isOpen={isShowModal}
        onClose={() => setIsShowModal(false)}
        studentToEdit={studentToEdit}
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

export default ParentsTable