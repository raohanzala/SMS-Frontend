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
import Layout from './components/layout/Layout';

// Public Pages
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ChangePassword from './pages/public/ChangePassword';


// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';
import { adminNav, ParentNav, studentNav, teacherNav } from './utils/navigationConfig';
import AdminParentDetails from './pages/private/admin/ParentDetail';
import StudentDetail from './pages/private/admin/StudentDetail';
import TeacherDetail from './pages/private/admin/TeacherDetail';
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
                    <Layout navigation={adminNav} />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="students/:studentId" element={<StudentDetail />} />
                  <Route path="parents" element={<AdminParents />} />
                  <Route path="parents/:parentId" element={<AdminParentDetails />} />
                  <Route path="teachers" element={<AdminTeachers />} />
                  <Route path="teachers/:teacherId" element={<TeacherDetail />} />
                  <Route path="classes" element={<AdminClasses />} />
                  <Route path="subjects" element={<AdminSubjects />} />
                  <Route path="timetable" element={<AdminTimetable />} />
                  <Route path="attendance" element={<AdminAttendance />} />
                  <Route path="fees" element={<AdminFees />} />
                  <Route path="exams" element={<AdminExams />} />
                  <Route path="results" element={<AdminResults />} />
                  <Route path="noticeboard" element={<AdminNoticeboard />} />
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
                  {/* <Route path="homework" element={<TeacherHomework />} />
                    <Route path="marks" element={<TeacherMarks />} />
                    <Route path="timetable" element={<TeacherTimetable />} />
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
const AdminStudents = React.lazy(() => import('./pages/private/admin/Students'));
const AdminTeachers = React.lazy(() => import('./pages/private/admin/Teachers'));
const AdminParents = React.lazy(() => import('./pages/private/admin/Parents'));
const AdminClasses = React.lazy(() => import('./pages/private/admin/Classes'));
const AdminSubjects = React.lazy(() => import('./pages/private/admin/Subjects'));
const AdminTimetable = React.lazy(() => import('./pages/private/admin/Timetable'));
const AdminAttendance = React.lazy(() => import('./pages/private/admin/Attendance'));
const AdminFees = React.lazy(() => import('./pages/private/admin/Fees'));
const AdminExams = React.lazy(() => import('./pages/private/admin/Exams'));
const AdminResults = React.lazy(() => import('./pages/private/admin/Results'));
const AdminNoticeboard = React.lazy(() => import('./pages/private/admin/Noticeboard'));
// const AdminSettings = React.lazy(() => import('./pages/private/admin/Settings'));

const TeacherDashboard = React.lazy(() => import('./pages/private/teacher/Dashboard'));
const TeacherAttendance = React.lazy(() => import('./pages/private/teacher/Attendance'));
// const TeacherHomework = React.lazy(() => import('./pages/private/teacher/Homework'));
// const TeacherMarks = React.lazy(() => import('./pages/private/teacher/Marks'));
// const TeacherTimetable = React.lazy(() => import('./pages/private/teacher/Timetable'));
// const TeacherMessages = React.lazy(() => import('./pages/private/teacher/Messages'));

const StudentDashboard = React.lazy(() => import('./pages/private/student/Dashboard'));
// const StudentHomework = React.lazy(() => import('./pages/private/student/Homework'));
// const StudentAttendance = React.lazy(() => import('./pages/private/student/Attendance'));
// const StudentResults = React.lazy(() => import('./pages/private/student/Results'));
// const StudentNotices = React.lazy(() => import('./pages/private/student/Notices'));
// const StudentProfile = React.lazy(() => import('./pages/private/student/Profile'));

const ParentDashboard = React.lazy(() => import('./pages/private/parent/Dashboard'));
// const ParentFees = React.lazy(() => import('./pages/private/parent/Fees'));
// const ParentResults = React.lazy(() => import('./pages/private/parent/Results'));
// const ParentMessages = React.lazy(() => import('./pages/private/parent/Messages'));
// const ParentNotices = React.lazy(() => import('./pages/private/parent/Notices'));

export default App;