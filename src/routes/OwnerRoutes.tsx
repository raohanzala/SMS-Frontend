import { Routes, Route } from "react-router-dom";
import { ownerNav } from "@/utils/navigationConfig";
import Layout from "@/components/layout/Layout";
import AdminDashboard from "@/features/dashboard/admin/pages/AdminDashboard";
import CampusesPage from "@/features/campuses/pages/CampusesPage";
import StudentsPage from "@/features/students/pages/StudentsPage";
import StudentFormPage from "@/features/students/pages/StudentFormPage";
import TeachersPage from "@/features/teachers/pages/TeachersPage";
import TeacherFormPage from "@/features/teachers/pages/TeacherFormPage";
import EmployeesPage from "@/features/employees/pages/EmployeesPage";
import EmployeeFormPage from "@/features/employees/pages/EmployeeFormPage";
import SessionsPage from "@/features/sessions/pages/SessionsPage";
import ClassesPage from "@/features/classes/pages/ClassesPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import FeeStructurePage from "@/features/fees/pages/FeeStructurePage";
import AdminPayrollPage from "@/features/salary/pages/AdminPayrollPage";

const OwnerRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={ownerNav} />}>
      <Route index path="dashboard" element={<AdminDashboard />} />
      <Route path="campuses" element={<CampusesPage />} />
      <Route path="settings/campuses" element={<CampusesPage />} />
      
      {/* Users */}
      <Route path="students" element={<StudentsPage />} />
      <Route path="students/new" element={<StudentFormPage />} />
      <Route path="teachers" element={<TeachersPage />} />
      <Route path="teachers/new" element={<TeacherFormPage />} />
      <Route path="staff" element={<EmployeesPage />} />
      <Route path="staff/new" element={<EmployeeFormPage />} />
      
      {/* Academics */}
      <Route path="sessions" element={<SessionsPage />} />
      <Route path="classes" element={<ClassesPage />} />
      {/* TODO: Implement Levels page */}
      {/* <Route path="levels" element={<LevelsPage />} /> */}
      
      {/* Finance */}
      <Route path="fees/structure" element={<FeeStructurePage />} />
      {/* TODO: Implement these pages */}
      {/* <Route path="fees/reports" element={<FeeReportsPage />} /> */}
      {/* <Route path="salary/reports" element={<SalaryReportsPage />} /> */}
      
      {/* Settings */}
      <Route path="settings" element={<SettingsPage />} />
      
      {/* TODO: Implement Audit Logs */}
      {/* <Route path="audit-logs" element={<AuditLogsPage />} /> */}
    </Route>
  </Routes>
);

export default OwnerRoutes;
