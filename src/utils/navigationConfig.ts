import {
  FiHome,
  FiClipboard,
  FiBookOpen,
  FiBarChart2,
  FiCalendar,
  FiMessageSquare,
  FiUsers,
  FiUserCheck,
  FiDollarSign,
  FiFileText,
  FiBell,
  FiSettings,
  FiUser,
  FiUserPlus,
  FiBriefcase,
  FiBook,
  FiLayers,
} from 'react-icons/fi';


export const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
  {
    name: 'Students',
    icon: FiUsers,
    children: [
      { name: 'All Students', href: '/admin/students' },
      { name: 'Manage Promotions', href: '/admin/students/promotions' },
    ],
  },
  { name: 'Parents', href: '/admin/parents', icon: FiUserPlus },
  { name: 'Employees', href: '/admin/employees', icon: FiBriefcase },
  { name: 'Teachers', href: '/admin/teachers', icon: FiUserCheck },
  { name: 'Classes', href: '/admin/classes', icon: FiLayers },
  { name: 'Subjects', href: '/admin/subjects', icon: FiBook },
  {
    name: 'Timetable',
    icon: FiCalendar,
    children: [
      { name: 'Manage Timetables', href: '/admin/timetable' },
      { name: 'Class Timetable', href: '/admin/timetable/class' },
      { name: 'Teacher Timetable', href: '/admin/timetable/teacher' },
      { name: 'Student Timetable', href: '/admin/timetable/student' },
    ],
  },
  {
    name: 'Attendance',
    icon: FiClipboard,
    children: [
      { name: 'Class Attendance', href: '/admin/attendance/class' },
      { name: 'Employees Attendance', href: '/admin/attendance/employees' },
      // { name: 'Class wise Report', href: '/admin/attendance/classwise-report' },
    ],
  },
  { name: 'Fees', href: '/admin/fees', icon: FiDollarSign },
  { name: 'Exams', href: '/admin/exams', icon: FiFileText },
  { name: 'Results', href: '/admin/results', icon: FiBarChart2 },
  { name: 'Noticeboard', href: '/admin/noticeboard', icon: FiBell },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings },
];

export const teacherNav = [
  { name: 'Dashboard', href: '/teacher/dashboard', icon: FiHome },
  { name: 'Attendance', href: '/teacher/attendance', icon: FiClipboard },
  { name: 'Homework', href: '/teacher/homework', icon: FiBookOpen },
  { name: 'Marks', href: '/teacher/marks', icon: FiBarChart2 },
  {
    name: 'Timetable',
    icon: FiCalendar,
    children: [
      { name: 'My Timetable', href: '/teacher/timetable' },
      { name: 'Class Timetable', href: '/teacher/timetable/class' },
    ],
  },
  { name: 'Messages', href: '/teacher/messages', icon: FiMessageSquare },
];
export const studentNav = [
  { name: 'Dashboard', href: '/student/dashboard', icon: FiHome },
  { name: 'Timetable', href: '/student/timetable', icon: FiCalendar },
  { name: 'Homework', href: '/student/homework', icon: FiBookOpen },
  { name: 'Attendance', href: '/student/attendance', icon: FiClipboard },
  { name: 'Results', href: '/student/results', icon: FiBarChart2 },
  { name: 'Notices', href: '/student/notices', icon: FiBell },
  { name: 'Profile', href: '/student/profile', icon: FiUser },
];

export const ParentNav = [
  { name: 'Dashboard', href: '/parent/dashboard', icon: FiHome },
  { name: 'Timetable', href: '/parent/timetable', icon: FiCalendar },
  { name: 'Fees', href: '/parent/fees', icon: FiDollarSign },
  { name: 'Results', href: '/parent/results', icon: FiBarChart2 },
  { name: 'Messages', href: '/parent/messages', icon: FiMessageSquare },
  { name: 'Notices', href: '/parent/notices', icon: FiBell },
];