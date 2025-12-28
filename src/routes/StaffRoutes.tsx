import { Routes, Route } from "react-router-dom";
import { adminNav } from "@/utils/navigationConfig";
import TeacherDashboard from "@/features/dashboard/teacher/pages/TeacherDashboard";
import StaffSalaryPage from "@/features/salary/pages/StaffSalaryPage";
import Layout from "@/components/layout/Layout";

const StaffRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={adminNav} />}>
      <Route index element={<TeacherDashboard />} />
      <Route path="salary" element={<StaffSalaryPage />} />
    </Route>
  </Routes>
);

export default StaffRoutes;
