import {
  Home,
  Clipboard,
  BookOpen,
  BarChart2,
  Calendar,
  MessageSquare,
  Users,
  UserCheck,
  DollarSign,
  FileText,
  Bell,
  Settings,
  User,
  UserPlus,
  Briefcase,
  Book,
  Layers,
  GitBranch,
  Award,
} from 'lucide-react';


export const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  {
    name: 'Students',
    icon: Users,
    children: [
      { name: 'All Students', href: '/admin/students' },
      { name: 'Family Tree', href: '/admin/students/family-tree', icon: GitBranch },
      { name: 'Manage Promotions', href: '/admin/students/promotions' },
    ],
  },
  { name: 'Parents', href: '/admin/parents', icon: UserPlus },
  { name: 'Employees', href: '/admin/employees', icon: Briefcase },
  { name: 'Teachers', href: '/admin/teachers', icon: UserCheck },
  { name: 'Classes', href: '/admin/classes', icon: Layers },
  { name: 'Subjects', href: '/admin/subjects', icon: Book },
  { name: 'Sessions', href: '/admin/sessions', icon: Calendar },
  {
    name: 'Timetable',
    icon: Calendar,
    children: [
      { name: 'Manage Timetables', href: '/admin/timetable' },
      { name: 'Class Timetable', href: '/admin/timetable/class' },
      { name: 'Teacher Timetable', href: '/admin/timetable/teacher' },
      { name: 'Student Timetable', href: '/admin/timetable/student' },
    ],
  },
  {
    name: 'Attendance',
    icon: Clipboard,
    children: [
      { name: 'Class Attendance', href: '/admin/attendance/class' },
      { name: 'Teacher Attendance', href: '/admin/attendance/teachers' },
      { name: 'Staff Attendance', href: '/admin/attendance/staff' },
      { name: 'Employees Attendance', href: '/admin/attendance/employees' },
      // { name: 'Class wise Report', href: '/admin/attendance/classwise-report' },
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
  { name: 'Exams', href: '/admin/exams', icon: FileText },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
  { name: 'Leaves', href: '/admin/leaves', icon: Calendar },
  { name: 'Payroll', href: '/admin/payroll', icon: DollarSign },
  { name: 'Results', href: '/admin/results', icon: BarChart2 },
  { name: 'Noticeboard', href: '/admin/noticeboard', icon: Bell },
  {
    name: 'Settings',
    icon: Settings,
    children: [
      { name: 'General Settings', href: '/admin/settings' },
      { name: 'Campuses', href: '/admin/settings/campuses' },
    ],
  },
];

export const teacherNav = [
  { name: 'Dashboard', href: '/teacher/dashboard', icon: Home },
  { name: 'Attendance', href: '/teacher/attendance', icon: Clipboard },
  { name: 'Homework', href: '/teacher/homework', icon: BookOpen },
  { name: 'Marks', href: '/teacher/marks', icon: BarChart2 },
  { name: 'Leaves', href: '/teacher/leaves', icon: Calendar },
  {
    name: 'Timetable',
    icon: Calendar,
    children: [
      { name: 'My Timetable', href: '/teacher/timetable' },
      { name: 'Class Timetable', href: '/teacher/timetable/class' },
    ],
  },
  { name: 'Messages', href: '/teacher/messages', icon: MessageSquare },
];
export const studentNav = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'Timetable', href: '/student/timetable', icon: Calendar },
  { name: 'Homework', href: '/student/homework', icon: BookOpen },
  { name: 'Attendance', href: '/student/attendance', icon: Clipboard },
  { name: 'Results', href: '/student/results', icon: BarChart2 },
  { name: 'Notices', href: '/student/notices', icon: Bell },
  { name: 'Profile', href: '/student/profile', icon: User },
];

export const ParentNav = [
  { name: 'Dashboard', href: '/parent/dashboard', icon: Home },
  { name: 'Timetable', href: '/parent/timetable', icon: Calendar },
  { name: 'Attendance', href: '/parent/attendance', icon: Clipboard },
  { name: 'Fees', href: '/parent/fees', icon: DollarSign },
  { name: 'Results', href: '/parent/results', icon: BarChart2 },
  { name: 'Messages', href: '/parent/messages', icon: MessageSquare },
  { name: 'Notices', href: '/parent/notices', icon: Bell },
];