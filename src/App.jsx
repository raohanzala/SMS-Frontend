import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store/store';
import { SettingsProvider } from './contexts/SettingsContext';

// Layout Components
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import Layout from './components/layout/Layout';

// Public Pages
import Login from './features/authentication/pages/LoginPage';
import Register from './features/authentication/pages/SignupPage';
import ForgotPassword from './features/authentication/pages/ForgotPasswordPage';
import ChangePassword from './features/authentication/pages/ChangePasswordPage';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';
import { ParentNav, studentNav, teacherNav } from './utils/navigationConfig';
import AdminParentDetails from './pages/private/admin/ParentDetail';
import StudentDetail from './pages/private/admin/StudentDetail';
import TeacherDetail from './pages/private/admin/TeacherDetail';
import ClassAttendance from './pages/private/admin/ClassAttendance';
import EmployeesAttendance from './pages/private/admin/EmployeesAttendance';
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Navigate to="/login" replace />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="change-password" element={<ChangePassword />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="students/new" element={<AdminStudentForm />} />
                  <Route path="students/promotions" element={<AdminManagePromotions />} />
                  <Route path="students/family-tree" element={<AdminFamilyTree />} />
                  <Route path="students/:studentId" element={<StudentDetail />} />
                  <Route path="students/:studentId/edit" element={<AdminStudentForm />} />
                  <Route path="parents" element={<AdminParents />} />
                  <Route path="parents/:parentId" element={<AdminParentDetails />} />
                  <Route path="employees" element={<AdminEmployees />} />
                  <Route path="employees/new" element={<AdminEmployeeForm />} />
                  <Route path="employees/:employeeId" element={<EmployeeDetail />} />
                  <Route path="employees/:employeeId/edit" element={<AdminEmployeeForm />} />
                  <Route path="teachers" element={<AdminTeachers />} />
                  <Route path="teachers/new" element={<AdminTeacherForm />} />
                  <Route path="teachers/:teacherId" element={<TeacherDetail />} />
                  <Route path="teachers/:teacherId/edit" element={<AdminTeacherForm />} />
                  <Route path="classes" element={<AdminClasses />} />
                  <Route path="subjects" element={<AdminSubjects />} />
                  <Route path="timetable" element={<AdminTimetable />} />
                  <Route path="timetable/create" element={<AdminCreateTimetable />} />
                  <Route path="timetable/create/:timetableId" element={<AdminCreateTimetable />} />
                  <Route path="timetable/class" element={<AdminClassTimetable />} />
                  <Route path="timetable/class/:classId" element={<AdminClassTimetable />} />
                  <Route path="timetable/teacher" element={<AdminTeacherTimetable />} />
                  <Route path="timetable/teacher/:teacherId" element={<AdminTeacherTimetable />} />
                  <Route path="timetable/student" element={<AdminStudentTimetable />} />
                  <Route path="timetable/student/:studentId" element={<AdminStudentTimetable />} />
                  <Route path="attendance/class" element={<ClassAttendance />} />
                  <Route path="attendance/employees" element={<EmployeesAttendance />} />
                  {/* <Route path="attendance" element={<AdminAttendance />} /> */}

                  <Route path="fees" element={<AdminFees />} />
                  <Route path="exams" element={<AdminExams />} />
                  <Route path="results" element={<AdminResults />} />
                  <Route path="noticeboard" element={<AdminNoticeboard />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Teacher Routes */}
                <Route path="/teacher" element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <Layout navigation={teacherNav} />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/teacher/dashboard" replace />} />
                  <Route path="dashboard" element={<TeacherDashboard />} />
                  <Route path="attendance" element={<TeacherAttendance />} />
                  <Route path="timetable" element={<TeacherTimetable />} />
                  <Route path="timetable/:teacherId" element={<TeacherTimetableView />} />
                  <Route path="timetable/class" element={<TeacherClassTimetable />} />
                  <Route path="timetable/class/:classId" element={<TeacherClassTimetable />} />
                  {/* <Route path="homework" element={<TeacherHomework />} />
                    <Route path="marks" element={<TeacherMarks />} />
                    <Route path="messages" element={<TeacherMessages />} /> */}
                </Route>

                {/* Student Routes */}
                <Route path="/student" element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <Layout navigation={studentNav} />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/student/dashboard" replace />} />
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="timetable" element={<StudentTimetable />} />
                  <Route path="timetable/:studentId" element={<StudentTimetableView />} />
                  {/* <Route path="homework" element={<StudentHomework />} />
                    <Route path="attendance" element={<StudentAttendance />} />
                    <Route path="results" element={<StudentResults />} />
                    <Route path="notices" element={<StudentNotices />} />
                    <Route path="profile" element={<StudentProfile />} /> */}
                </Route>

                {/* Parent Routes */}
                <Route path="/parent" element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <Layout navigation={ParentNav} />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/parent/dashboard" replace />} />
                  <Route path="dashboard" element={<ParentDashboard />} />
                  <Route path="timetable" element={<ParentTimetable />} />
                  <Route path="timetable/:studentId" element={<ParentTimetableView />} />
                  {/* <Route path="fees" element={<ParentFees />} />
                    <Route path="results" element={<ParentResults />} />
                    <Route path="messages" element={<ParentMessages />} />
                    <Route path="notices" element={<ParentNotices />} /> */}
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </Router>
        </SettingsProvider>
      </QueryClientProvider>
    </Provider>
  );
}

// Lazy load all page components
const AdminDashboard = React.lazy(() => import('./pages/private/admin/Dashboard'));
const AdminStudents = React.lazy(() => import('./features/students/pages/StudentsPage'));
const AdminStudentForm = React.lazy(() => import('./features/students/pages/StudentFormPage'));
const AdminManagePromotions = React.lazy(() => import('./features/students/pages/ManagePromotionsPage'));
const AdminFamilyTree = React.lazy(() => import('./features/students/pages/FamilyTreePage'));
const AdminEmployees = React.lazy(() => import('./features/employees/pages/EmployeesPage'));
const AdminEmployeeForm = React.lazy(() => import('./features/employees/pages/EmployeeFormPage'));
const EmployeeDetail = React.lazy(() => import('./pages/private/admin/EmployeeDetail'));
const AdminTeachers = React.lazy(() => import('./features/teachers/pages/TeachersPage'));
const AdminTeacherForm = React.lazy(() => import('./features/teachers/pages/TeacherFormPage'));
const AdminParents = React.lazy(() => import('./features/parents/pages/ParentsPage'));
const AdminClasses = React.lazy(() => import('./features/classes/pages/ClassesPage'));
const AdminSubjects = React.lazy(() => import('./pages/private/admin/Subjects'));
const AdminTimetable = React.lazy(() => import('./pages/private/admin/Timetable'));
const AdminCreateTimetable = React.lazy(() => import('./features/timetable/pages/CreateTimetablePage'));
const AdminClassTimetable = React.lazy(() => import('./features/timetable/pages/ClassTimetablePage'));
const AdminTeacherTimetable = React.lazy(() => import('./features/timetable/pages/TeacherTimetablePage'));
const AdminStudentTimetable = React.lazy(() => import('./features/timetable/pages/StudentTimetablePage'));
const AdminFees = React.lazy(() => import('./pages/private/admin/Fees'));
const AdminExams = React.lazy(() => import('./pages/private/admin/Exams'));
const AdminResults = React.lazy(() => import('./pages/private/admin/Results'));
const AdminNoticeboard = React.lazy(() => import('./pages/private/admin/Noticeboard'));
const AdminSettings = React.lazy(() => import('./features/settings/pages/SettingsPage'));

const TeacherDashboard = React.lazy(() => import('./pages/private/teacher/Dashboard'));
const TeacherAttendance = React.lazy(() => import('./pages/private/teacher/Attendance'));
const TeacherTimetable = React.lazy(() => import('./features/timetable/pages/TeacherTimetablePage'));
const TeacherTimetableView = React.lazy(() => import('./features/timetable/pages/TeacherTimetablePage'));
const TeacherClassTimetable = React.lazy(() => import('./features/timetable/pages/ClassTimetablePage'));
// const TeacherHomework = React.lazy(() => import('./pages/private/teacher/Homework'));
// const TeacherMarks = React.lazy(() => import('./pages/private/teacher/Marks'));
// const TeacherMessages = React.lazy(() => import('./pages/private/teacher/Messages'));

const StudentDashboard = React.lazy(() => import('./pages/private/student/Dashboard'));
const StudentTimetable = React.lazy(() => import('./features/timetable/pages/StudentTimetablePage'));
const StudentTimetableView = React.lazy(() => import('./features/timetable/pages/StudentTimetablePage'));
// const StudentHomework = React.lazy(() => import('./pages/private/student/Homework'));
// const StudentAttendance = React.lazy(() => import('./pages/private/student/Attendance'));
// const StudentResults = React.lazy(() => import('./pages/private/student/Results'));
// const StudentNotices = React.lazy(() => import('./pages/private/student/Notices'));
// const StudentProfile = React.lazy(() => import('./pages/private/student/Profile'));

const ParentDashboard = React.lazy(() => import('./pages/private/parent/Dashboard'));
const ParentTimetable = React.lazy(() => import('./features/timetable/pages/StudentTimetablePage'));
const ParentTimetableView = React.lazy(() => import('./features/timetable/pages/StudentTimetablePage'));
// const ParentFees = React.lazy(() => import('./pages/private/parent/Fees'));
// const ParentResults = React.lazy(() => import('./pages/private/parent/Results'));
// const ParentMessages = React.lazy(() => import('./pages/private/parent/Messages'));
// const ParentNotices = React.lazy(() => import('./pages/private/parent/Notices'));

export default App;