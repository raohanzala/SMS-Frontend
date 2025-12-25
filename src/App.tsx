import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { store } from "./store/store";
import { SettingsProvider } from "./contexts/SettingsContext";

// Layout Components
import PublicLayout from "./components/layout/PublicLayout";
import Layout from "./components/layout/Layout";

// Public Pages
import Login from "./features/authentication/pages/LoginPage";
import Register from "./features/authentication/pages/SignupPage";
import ForgotPassword from "./features/authentication/pages/ForgotPasswordPage";
import ChangePassword from "./features/authentication/pages/ChangePasswordPage";
import SetPassword from "./features/authentication/pages/SetPasswordPage";
import CreateSchool from "./features/onboarding/pages/CreateSchoolPage";

// Protected Route Component
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import {
  adminNav,
  ParentNav,
  studentNav,
  teacherNav,
} from "./utils/navigationConfig";

// Admin Pages
import AdminDashboard from "./features/dashboard/admin/pages/AdminDashboard";
import StudentsPage from "./features/students/pages/StudentsPage";
import StudentFormPage from "./features/students/pages/StudentFormPage";
import ManagePromotionsPage from "./features/students/pages/ManagePromotionsPage";
import FamilyTreePage from "./features/students/pages/FamilyTreePage";
// import StudentDetail from './pages/private/admin/StudentDetailPage';
import ParentsPage from "./features/parents/pages/ParentsPage";
import ParentDetails from "./features/parents/components/ParentDetails";
import EmployeesPage from "./features/employees/pages/EmployeesPage";
import EmployeeFormPage from "./features/employees/pages/EmployeeFormPage";
// import EmployeeDetail from './pages/private/admin/EmployeeDetail';
import TeachersPage from "./features/teachers/pages/TeachersPage";
import TeacherFormPage from "./features/teachers/pages/TeacherFormPage";
// import TeacherDetail from './pages/private/admin/TeacherDetail';
import ClassesPage from "./features/classes/pages/ClassesPage";
import SessionsPage from "./features/sessions/pages/SessionsPage";
// import TimetablePage from './pages/private/admin/Timetable';
import CreateTimetablePage from "./features/timetable/pages/CreateTimetablePage";
import ClassTimetablePage from "./features/timetable/pages/ClassTimetablePage";
import TeacherTimetablePage from "./features/timetable/pages/TeacherTimetablePage";
import StudentTimetablePage from "./features/timetable/pages/StudentTimetablePage";
import ClassAttendancePage from "./features/ClassAttendance/pages/ClassAttendancePage";
// import EmployeesAttendance from './pages/private/admin/EmployeesAttendance';
// import FeesPage from './pages/private/admin/Fees';
// import ExamsPage from './pages/private/admin/Exams';
// import ResultsPage from './pages/private/admin/Results';
// import NoticeboardPage from './pages/private/admin/Noticeboard';
import SettingsPage from "./features/settings/pages/SettingsPage";

// Teacher Pages
import TeacherDashboard from "./features/dashboard/teacher/pages/TeacherDashboard";
// import TeacherAttendance from './pages/private/teacher/Attendance';

// Student Pages
import StudentDashboard from "./features/dashboard/student/pages/StudentDashboard";

// Parent Pages
import ParentDashboard from "./features/dashboard/parent/pages/ParentDashboard";
import SubjectsPage from "./features/subjects/pages/SubjectsPage";
import TimetablesPage from "./features/timetable/pages/TimetablesPage";

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
                  <Route
                    path="login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="forgot-password"
                    element={
                      <PublicRoute>
                        <ForgotPassword />
                      </PublicRoute>
                    }
                  />
                  <Route path="change-password" element={<ChangePassword />} />
                  <Route path="set-password" element={<SetPassword />} />
                </Route>

                {/* Onboarding Routes */}
                <Route path="/onboarding" element={<PublicLayout />}>
                  <Route path="create-school" element={<CreateSchool />} />
                </Route>

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "school_owner"]}>
                      <Layout navigation={adminNav} />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="students" element={<StudentsPage />} />
                  <Route path="students/new" element={<StudentFormPage />} />
                  <Route
                    path="students/promotions"
                    element={<ManagePromotionsPage />}
                  />
                  <Route
                    path="students/family-tree"
                    element={<FamilyTreePage />}
                  />
                  {/* <Route path="students/:studentId" element={<StudentDetail />} /> */}
                  <Route
                    path="students/:studentId/edit"
                    element={<StudentFormPage />}
                  />
                  <Route path="parents" element={<ParentsPage />} />
                  <Route path="parents/:parentId" element={<ParentDetails />} />
                  <Route path="employees" element={<EmployeesPage />} />
                  <Route path="employees/new" element={<EmployeeFormPage />} />
                  {/* <Route path="employees/:employeeId" element={<EmployeeDetail />} /> */}
                  <Route
                    path="employees/:employeeId/edit"
                    element={<EmployeeFormPage />}
                  />
                  <Route path="teachers" element={<TeachersPage />} />
                  <Route path="teachers/new" element={<TeacherFormPage />} />
                  {/* <Route path="teachers/:teacherId" element={<TeacherDetail />} /> */}
                  <Route
                    path="teachers/:teacherId/edit"
                    element={<TeacherFormPage />}
                  />
                  <Route path="classes" element={<ClassesPage />} />
                  <Route path="subjects" element={<SubjectsPage />} />
                  <Route path="sessions" element={<SessionsPage />} />
                  <Route path="timetable" element={<TimetablesPage />} />
                  <Route
                    path="timetable/create"
                    element={<CreateTimetablePage />}
                  />
                  <Route
                    path="timetable/create/:timetableId"
                    element={<CreateTimetablePage />}
                  />
                  <Route
                    path="timetable/class"
                    element={<ClassTimetablePage />}
                  />
                  <Route
                    path="timetable/class/:classId"
                    element={<ClassTimetablePage />}
                  />
                  <Route
                    path="timetable/teacher"
                    element={<TeacherTimetablePage />}
                  />
                  <Route
                    path="timetable/teacher/:teacherId"
                    element={<TeacherTimetablePage />}
                  />
                  <Route
                    path="timetable/student"
                    element={<StudentTimetablePage />}
                  />
                  <Route
                    path="timetable/student/:studentId"
                    element={<StudentTimetablePage />}
                  />
                  <Route
                    path="attendance/class"
                    element={<ClassAttendancePage />}
                  />
                  {/* <Route path="attendance/employees" element={<EmployeesAttendance />} />
                  <Route path="fees" element={<FeesPage />} />
                  <Route path="exams" element={<ExamsPage />} />
                  <Route path="results" element={<ResultsPage />} />
                  <Route path="noticeboard" element={<NoticeboardPage />} /> */}
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* Teacher Routes */}
                <Route
                  path="/teacher"
                  element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                      <Layout navigation={teacherNav} />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate to="/teacher/dashboard" replace />}
                  />
                  <Route path="dashboard" element={<TeacherDashboard />} />
                  {/* <Route path="attendance" element={<TeacherAttendance />} /> */}
                  <Route path="timetable" element={<TeacherTimetablePage />} />
                  <Route
                    path="timetable/:teacherId"
                    element={<TeacherTimetablePage />}
                  />
                  <Route
                    path="timetable/class"
                    element={<ClassTimetablePage />}
                  />
                  <Route
                    path="timetable/class/:classId"
                    element={<ClassTimetablePage />}
                  />
                </Route>

                {/* Student Routes */}
                <Route
                  path="/student"
                  element={
                    <ProtectedRoute allowedRoles={["student"]}>
                      <Layout navigation={studentNav} />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate to="/student/dashboard" replace />}
                  />
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="timetable" element={<StudentTimetablePage />} />
                  <Route
                    path="timetable/:studentId"
                    element={<StudentTimetablePage />}
                  />
                </Route>

                {/* Parent Routes */}
                <Route
                  path="/parent"
                  element={
                    <ProtectedRoute allowedRoles={["parent"]}>
                      <Layout navigation={ParentNav} />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate to="/parent/dashboard" replace />}
                  />
                  <Route path="dashboard" element={<ParentDashboard />} />
                  <Route path="timetable" element={<StudentTimetablePage />} />
                  <Route
                    path="timetable/:studentId"
                    element={<StudentTimetablePage />}
                  />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
              <Toaster position="top-right" richColors />
            </div>
          </Router>
        </SettingsProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
