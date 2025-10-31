import { useState } from 'react'
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi'
import { useTeachers } from './useTeachers';
import AddTeacher from './AddTeacher';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { useDeleteTeacher } from './useDeleteTeacher';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import ErrorMessage from '@/components/common/ErrorMessage';
import Spinner from '@/components/common/Spinner';


function TeachersTable({ isShowModal, setIsShowModal }) {

  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [teacherToEdit, setTeacherToEdit] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const navigate = useNavigate()

  const { teachers, isPending, error, pagination } = useTeachers();
  const { deleteTeacher, isDeleting } = useDeleteTeacher();

  const handleDelete = (id) => {
    setTeacherToDelete(id);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (teacherToDelete) {
      deleteTeacher(teacherToDelete, {
        onSuccess: () => {
          setIsDeleteModal(false);
          setTeacherToDelete(null);
        },
      });
    }
  }

  if (error) return <ErrorMessage message={error.message || "Failed to load subjects"} />;
  if (isPending) return <Spinner />;

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Teachers ({teachers?.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Classes
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
              {teachers?.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-50">
                  {/* Teacher info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          src={teacher.profileImage || teacher.gender === 'female' ? "/female-teacher-avatar.jpg" : '/male-student-avatar.jpg'}
                          alt={teacher.name}
                          className="h-14 w-14 rounded-full object-cover border"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {teacher.name}
                        </div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Subjects */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teacher.subjects?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map((subj, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No subjects assigned</span>
                    )}
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teacher.phone ? (
                      <div className="text-sm text-gray-900">{teacher.phone}</div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No phone</span>
                    )}
                  </td>

                  {/* Assigned Classes */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teacher.assignedClasses?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {teacher.assignedClasses.map((cls) => (
                          <span
                            key={cls._id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {cls.name} - {cls.section}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No classes assigned</span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(teacher.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => navigate(`/admin/teachers/${teacher._id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => { setIsShowModal(true); setTeacherToEdit(teacher); }}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher._id)}
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

      <AddTeacher teacherToEdit={teacherToEdit} isOpen={isShowModal} onClose={() => setIsShowModal(false)} />

      <ConfirmationModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="Delete Teacher"
        message="Are you sure you want to delete this teacher? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </>
  )
}

export default TeachersTable