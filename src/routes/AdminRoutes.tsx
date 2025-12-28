import { Routes, Route } from "react-router-dom";

import AdminDashboard from "@/features/dashboard/admin/pages/AdminDashboard";
import StudentsPage from "@/features/students/pages/StudentsPage";
import TeachersPage from "@/features/teachers/pages/TeachersPage";
import AdminStaffAttendancePage from "@/features/staffAttendance/pages/AdminStaffAttendancePage";
import Layout from "@/components/layout/Layout";
import { adminNav } from "@/utils/navigationConfig";

const AdminRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={adminNav} />}>
      <Route index element={<AdminDashboard />} />
      <Route path="students" element={<StudentsPage />} />
      <Route path="teachers" element={<TeachersPage />} />
      <Route path="attendance/staff" element={<AdminStaffAttendancePage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
