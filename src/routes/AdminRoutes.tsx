import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { adminNav } from "@/utils/navigationConfig";
import AdminDashboard from "@/features/dashboard/admin/pages/AdminDashboard";
import StudentsPage from "@/features/students/pages/StudentsPage";
import StudentFormPage from "@/features/students/pages/StudentFormPage";
import TeachersPage from "@/features/teachers/pages/TeachersPage";
import TeacherFormPage from "@/features/teachers/pages/TeacherFormPage";
import EmployeesPage from "@/features/employees/pages/EmployeesPage";
import EmployeeFormPage from "@/features/employees/pages/EmployeeFormPage";
import ClassesPage from "@/features/classes/pages/ClassesPage";
import SubjectsPage from "@/features/subjects/pages/SubjectsPage";
import AdminClassAttendancePage from "@/features/attendance/pages/AdminClassAttendancePage";
import AdminTeacherAttendancePage from "@/features/teacherAttendance/pages/AdminTeacherAttendancePage";
import AdminStaffAttendancePage from "@/features/staffAttendance/pages/AdminStaffAttendancePage";
import AdminExamsPage from "@/features/exams/pages/AdminExamsPage";
import AdminFeesPage from "@/features/fees/pages/AdminFeesPage";
import AdminCertificatesPage from "@/features/certificates/pages/AdminCertificatesPage";
import AdminActivityLogsPage from "@/features/auditLogs/pages/AdminActivityLogsPage";

const AdminRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={adminNav} />}>
      <Route index path="dashboard" element={<AdminDashboard />} />
      
      {/* Students */}
      <Route path="students" element={<StudentsPage />} />
      <Route path="students/new" element={<StudentFormPage />} />
      <Route path="students/:studentId/edit" element={<StudentFormPage />} />
      
      {/* Teachers */}
      <Route path="teachers" element={<TeachersPage />} />
      <Route path="teachers/new" element={<TeacherFormPage />} />
      <Route path="teachers/:teacherId/edit" element={<TeacherFormPage />} />
      
      {/* Staff */}
      <Route path="employees" element={<EmployeesPage />} />
      <Route path="employees/new" element={<EmployeeFormPage />} />
      <Route path="employees/:employeeId/edit" element={<EmployeeFormPage />} />
      
      {/* Classes & Subjects */}
      <Route path="classes" element={<ClassesPage />} />
      <Route path="subjects" element={<SubjectsPage />} />
      
      {/* Attendance */}
      <Route path="attendance/class" element={<AdminClassAttendancePage />} />
      <Route path="attendance/teachers" element={<AdminTeacherAttendancePage />} />
      <Route path="attendance/staff" element={<AdminStaffAttendancePage />} />
      
      {/* Exams & Marks */}
      <Route path="exams" element={<AdminExamsPage />} />
      
      {/* Fees */}
      <Route path="fees" element={<AdminFeesPage />} />
      <Route path="fees/structure" element={<AdminFeesPage />} />
      
      {/* Certificates */}
      <Route path="certificates" element={<AdminCertificatesPage />} />
      
      {/* Activity Logs */}
      <Route path="activity-logs" element={<AdminActivityLogsPage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
