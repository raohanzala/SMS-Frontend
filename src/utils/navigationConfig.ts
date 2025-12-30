import {
  Home,
  Clipboard,
  BarChart2,
  Calendar,
  Users,
  UserCheck,
  DollarSign,
  FileText,
  Settings,
  Briefcase,
  Book,
  Layers,
  Award,
} from 'lucide-react';

// Super Admin Navigation
export const superAdminNav = [
  { name: 'Dashboard', href: '/super-admin/dashboard', icon: Home },
  // TODO: Implement these
  // { name: 'Schools', href: '/super-admin/schools', icon: Building },
  // { name: 'Owners', href: '/super-admin/owners', icon: UserCheck },
  // { name: 'Subscriptions', href: '/super-admin/subscriptions', icon: CreditCard },
  // { name: 'System Logs', href: '/super-admin/logs', icon: FileText },
  // { name: 'SaaS Settings', href: '/super-admin/settings', icon: Settings },
];

// School Owner Navigation
export const ownerNav = [
  { name: 'Dashboard', href: '/owner/dashboard', icon: Home },
  { name: 'Campuses', href: '/owner/settings/campuses', icon: Layers },
  {
    name: 'Users',
    icon: Users,
    children: [
      { name: 'Students', href: '/owner/students' },
      { name: 'Teachers', href: '/owner/teachers' },
      { name: 'Staff', href: '/owner/staff' },
    ],
  },
  {
    name: 'Academics',
    icon: Book,
    children: [
      { name: 'Sessions', href: '/owner/sessions' },
      { name: 'Classes', href: '/owner/classes' },
      // TODO: { name: 'Levels', href: '/owner/levels' },
    ],
  },
  {
    name: 'Finance',
    icon: DollarSign,
    children: [
      { name: 'Fee Structure', href: '/owner/fees/structure' },
      // TODO: { name: 'Fee Reports', href: '/owner/fees/reports' },
      // TODO: { name: 'Salary Reports', href: '/owner/salary/reports' },
    ],
  },
  { name: 'Settings', href: '/owner/settings', icon: Settings },
  // TODO: { name: 'Audit Logs', href: '/owner/audit-logs', icon: FileText },
];

// Admin Navigation
export const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  {
    name: 'Students',
    icon: Users,
    children: [
      { name: 'All Students', href: '/admin/students' },
      { name: 'Add Student', href: '/admin/students/new' },
    ],
  },
  { name: 'Teachers', href: '/admin/teachers', icon: UserCheck },
  { name: 'Staff', href: '/admin/employees', icon: Briefcase },
  { name: 'Classes', href: '/admin/classes', icon: Layers },
  { name: 'Subjects', href: '/admin/subjects', icon: Book },
  {
    name: 'Attendance',
    icon: Clipboard,
    children: [
      { name: 'Class Attendance', href: '/admin/attendance/class' },
      { name: 'Teacher Attendance', href: '/admin/attendance/teachers' },
      { name: 'Staff Attendance', href: '/admin/attendance/staff' },
    ],
  },
  {
    name: 'Exams',
    icon: FileText,
    children: [
      { name: 'Manage Exams', href: '/admin/exams' },
    ],
  },
  {
    name: 'Fees',
    icon: DollarSign,
    children: [
      { name: 'Student Fees', href: '/admin/fees' },
      { name: 'Fee Structure', href: '/admin/fees/structure' },
    ],
  },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
];

// Staff Navigation
export const staffNav = [
  { name: 'Dashboard', href: '/staff/dashboard', icon: Home },
  { name: 'Fees', href: '/staff/fees', icon: DollarSign },
  { name: 'Leaves', href: '/staff/leaves', icon: Calendar },
  // TODO: { name: 'Attendance', href: '/staff/attendance', icon: Clipboard },
  // TODO: { name: 'Student Records', href: '/staff/students', icon: Users },
];

// Teacher Navigation
export const teacherNav = [
  { name: 'Dashboard', href: '/teacher/dashboard', icon: Home },
  { name: 'Attendance', href: '/teacher/attendance', icon: Clipboard },
  { name: 'Marks', href: '/teacher/marks', icon: BarChart2 },
  { name: 'Leaves', href: '/teacher/leaves', icon: Calendar },
  { name: 'Salary', href: '/teacher/salary', icon: DollarSign },
  // TODO: { name: 'My Classes', href: '/teacher/classes', icon: BookOpen },
  // TODO: {
  //   name: 'Timetable',
  //   icon: Calendar,
  //   children: [
  //     { name: 'My Timetable', href: '/teacher/timetable' },
  //     { name: 'Class Timetable', href: '/teacher/timetable/class' },
  //   ],
  // },
];

// Student Navigation
export const studentNav = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'Attendance', href: '/student/attendance', icon: Clipboard },
  { name: 'Results', href: '/student/results', icon: BarChart2 },
  { name: 'Fees', href: '/student/fees', icon: DollarSign },
  // TODO: { name: 'Profile', href: '/student/profile', icon: User },
  // TODO: { name: 'Timetable', href: '/student/timetable', icon: Calendar },
  // TODO: { name: 'Certificates', href: '/student/certificates', icon: Award },
];

// Parent Navigation
export const ParentNav = [
  { name: 'Dashboard', href: '/parent/dashboard', icon: Home },
  { name: 'Attendance', href: '/parent/attendance', icon: Clipboard },
  { name: 'Results', href: '/parent/results', icon: BarChart2 },
  { name: 'Fees', href: '/parent/fees', icon: DollarSign },
  // TODO: { name: 'Child Profile', href: '/parent/child', icon: User },
  // TODO: { name: 'Leave Requests', href: '/parent/leaves', icon: Calendar },
];
