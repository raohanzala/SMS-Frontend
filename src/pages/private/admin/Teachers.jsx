import React, { useState } from 'react';
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiCalendar,
} from 'react-icons/fi';
import { useTeachers } from '../../../features/teachers/useTeachers';
import AddTeacher from '../../../features/teachers/AddTeacher';
import TeachersTable from '../../../features/teachers/TeachersTable';
import TableOperations from '../../../components/common/TableOperations';

const AdminTeachers = () => {
  const [isShowModal, setIsShowModal] = useState(false);


  // Mock teacher data
  // const teachers = [
  //   {
  //     id: 1,
  //     name: 'John Smith',
  //     email: 'john.smith@school.com',
  //     phone: '+1 234-567-8901',
  //     subject: 'Mathematics',
  //     qualification: 'M.Sc. Mathematics',
  //     experience: '8 years',
  //     joiningDate: '2020-03-15',
  //     status: 'active',
  //     avatar: 'https://via.placeholder.com/40',
  //     assignedClasses: ['Class 3A', 'Class 4B', 'Class 5A'],
  //   },
  //   {
  //     id: 2,
  //     name: 'Sarah Johnson',
  //     email: 'sarah.johnson@school.com',
  //     phone: '+1 234-567-8902',
  //     subject: 'English',
  //     qualification: 'M.A. English Literature',
  //     experience: '5 years',
  //     joiningDate: '2021-08-01',
  //     status: 'active',
  //     avatar: 'https://via.placeholder.com/40',
  //     assignedClasses: ['Class 1A', 'Class 2B', 'Class 3B'],
  //   },
  //   {
  //     id: 3,
  //     name: 'Michael Brown',
  //     email: 'michael.brown@school.com',
  //     phone: '+1 234-567-8903',
  //     subject: 'Science',
  //     qualification: 'M.Sc. Physics',
  //     experience: '10 years',
  //     joiningDate: '2018-06-10',
  //     status: 'active',
  //     avatar: 'https://via.placeholder.com/40',
  //     assignedClasses: ['Class 4A', 'Class 5B'],
  //   },
  //   {
  //     id: 4,
  //     name: 'Emily Davis',
  //     email: 'emily.davis@school.com',
  //     phone: '+1 234-567-8904',
  //     subject: 'History',
  //     qualification: 'M.A. History',
  //     experience: '6 years',
  //     joiningDate: '2020-09-01',
  //     status: 'inactive',
  //     avatar: 'https://via.placeholder.com/40',
  //     assignedClasses: ['Class 2A', 'Class 3A'],
  //   },
  //   {
  //     id: 5,
  //     name: 'David Wilson',
  //     email: 'david.wilson@school.com',
  //     phone: '+1 234-567-8905',
  //     subject: 'Computer Science',
  //     qualification: 'M.Tech Computer Science',
  //     experience: '4 years',
  //     joiningDate: '2022-01-15',
  //     status: 'active',
  //     avatar: 'https://via.placeholder.com/40',
  //     assignedClasses: ['Class 4B', 'Class 5A'],
  //   },
  // ];



  return (
    <div className="space-y-6">
      {/* Header */}
      <TableOperations
        operationTitle="Teachers Management"
        operationDesc="Manage all teachers in the school"
        onClick={() => setIsShowModal(true)}
        buttonText="Add Teacher"
      />

      {/* Teachers Table */}
      <TeachersTable isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

    </div>
  );
};

export default AdminTeachers;

// <div className="bg-white rounded-lg shadow p-6">
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//     {/* Search */}
//     <div className="relative">
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <FiSearch className="h-5 w-5 text-gray-400" />
//       </div>
//       <input
//         type="text"
//         placeholder="Search teachers..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//       />
//     </div>

//     {/* Subject Filter */}
//     <div>
//       <select
//         value={selectedSubject}
//         onChange={(e) => setSelectedSubject(e.target.value)}
//         className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
//       >
//         <option value="all">All Subjects</option>
//         {subjects.map((subject) => (
//           <option key={subject} value={subject}>
//             {subject}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* Export Button */}
//     <div>
//       <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
//         <FiCalendar className="mr-2 h-4 w-4" />
//         View Schedule
//       </button>
//     </div>
//   </div>
// </div>